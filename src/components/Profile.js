import { gql, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// GraphQL query for name, avatar image etc. of Github profiles
const PROFILE_REQUEST = gql`
  query ProfileDisplay($username: String!) {
    user(login: $username) {
      name
      avatarUrl
      bio
      repositories(last: 10) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;
export default function Profile() {
  // username input
  const [username, setUsername] = useState('');
  // by default searched username is part of URL or undefined
  const [search, setSearch] = useState(window.location.pathname.slice(1));

  // setting variable for username which is then looked up after hitting search button
  const { loading, error, data } = useQuery(PROFILE_REQUEST, {
    variables: {
      username: search,
    },
  });

  // after hitting search button URL path will be also updated and we can also search by changing URL path itself
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    navigate(`/${search}`, { replace: true });
  }, [navigate, search]);

  useEffect(() => {
    handleOnClick();
  }, [search, handleOnClick]);

  return (
    <>
      <br />
      <label>
        Search for Github Profile:{' '}
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
          }}
        />
      </label>
      <button onClick={() => setSearch(username)}>Search</button>

      {/* in case search is still not define, don't display errors */}
      {!search ? (
        ''
      ) : error ? (
        <h1>You have an error: {error.message}</h1>
      ) : loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>{data.user.name}</h1>
          <img src={data.user.avatarUrl} alt="user's profile photograph" />
          <h2>{data.user.bio}</h2>
          <ul>
            {data.user.repositories.edges.map(({ node }) => (
              <li key={node.id}>{node.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
