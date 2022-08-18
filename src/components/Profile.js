import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const [username, setUsername] = useState(window.location.pathname.slice(1));
  const [search, setSearch] = useState(true);
  console.log(search);
  const { loading, error, data } = useQuery(PROFILE_REQUEST, {
    variables: {
      username: username,
    },
  });

  function updateurl(x) {
    // history.push(x);
  }

  return (
    <>
      <label>
        Search for Github Profile{' '}
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value);
            history.push(event.currentTarget.value);
          }}
        />
      </label>
      {!username ? (
        ''
      ) : error ? (
        <h1>You have an error {error.message}</h1>
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
