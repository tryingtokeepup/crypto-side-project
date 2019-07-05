import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Authentication from './components/auth.js';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    box-sizing: border-box;
    color: #fff;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif, cursive;
    background-color: #282c34;
    margin : 0 auto;
    height: 100%
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }

`;

const MainPageDiv = styled.div`
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const name = 'placeholder';

function App() {
  return (
    <MainPageDiv>
      <GlobalStyle />
      <header>
        <h1>Hey {name}, thanks for signing up!</h1>
        <p>Thank you for logging in!</p>
      </header>
    </MainPageDiv>
  );
}

export default Authentication(App);
