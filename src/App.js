import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Authentication from './components/auth.js';
import DEXAG from 'dexag-sdk';

const sdk = DEXAG.fromProvider(window.ethereum);
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
const orderModel = {
  metadata: {
    source: {}
  }
};

// console.log('trial promise = ', findTrade());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: orderModel,
      tokenPair: {
        to: 'DAI',
        from: 'ETH'
      },
      type: 'buy',
      purchase_type: false,
      loaded: false
    };
  }

  findTrade = async () => {
    const trade = await sdk.getTrade({
      to: 'cDAI',
      from: 'ETH',
      toAmount: 1,
      dex: 'Best'
    });
    this.setState({ ...this.state, order: trade });
  };

  componentDidMount() {
    sdk.registerStatusHandler((status, data) => {
      this.setState({ web3Status: { status, data } });
      this.timeoutStatus(status);
      console.log(status);
    });
    this.findTrade();
    console.log('trial = ', this.state.order);
    // find the price for default pair
    // this.findTrades();
  }

  render() {
    console.log('trial = ', this.state.order);
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
}

export default Authentication(App);
