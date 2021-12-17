import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { LoginContextProvider, StoreContextProvider } from './Store';

export default function App() {
  return (
    <Router>
      <LoginContextProvider>
        <Layout>
          <StoreContextProvider>
            <Routes />
          </StoreContextProvider>
        </Layout>
      </LoginContextProvider>
    </Router>
  );
}
