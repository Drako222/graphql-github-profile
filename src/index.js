import './index.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GIT_ACCESS_KEY}
    `,
  },
});
// ${process.env.GIT_ACCESS_KEY}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* App needs to be contained in ApolloProvider component */}
    <ApolloProvider client={client}>
      {/* I am using Router component for changing  after every search */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
