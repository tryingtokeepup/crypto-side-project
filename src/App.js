import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Authentication from './components/auth.js';
import CoinForm from './components/form';
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const name = 'User';
const orderModel = {
  metadata: {
    source: {}
  }
};

const MainContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  min-width: 300px;
  border: 1px solid white;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: orderModel,
      tokenPair: {
        to: 'ETH',
        from: 'DAI'
      },
      type: 'buy',
      purchase_type: false,
      loaded: false
    };
  }

  findTrade = async () => {
    let { tokenPair, type } = this.state;
    const trade = await sdk.getTrade({
      to: tokenPair.to,
      from: tokenPair.from,
      toAmount: 1,
      dex: 'Best'
    });
    this.setState({ ...this.state, order: trade });
  };
  changeTokenTo = newType => {
    let tokenPair = this.state.tokenPair;
    this.setState({ order: orderModel });
    // let the user change the token type

    if (newType === tokenPair.from) {
      alert('Please choose a different Token to change into!');
    } else {
      this.setState(prevState => ({
        tokenPair: {
          ...prevState.tokenPair,
          to: newType
        }
      }));
    }
    this.findTrade();
  };

  changeTokenFrom = newType => {
    let tokenPair = this.state.tokenPair;
    this.setState({ order: orderModel });
    // let the user change the token type

    if (newType === tokenPair.to) {
      alert('Please choose a different Token to exchange from!');
    } else {
      this.setState(prevState => ({
        tokenPair: {
          ...prevState.tokenPair,
          from: newType
        }
      }));
    }
    this.findTrade();
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
    console.log(this.state.tokenPair);
    return (
      <MainPageDiv>
        <GlobalStyle />
        <header>
          <h1>Hey {name}, thanks for signing up!</h1>
          <p>Thank you for logging in!</p>
        </header>
        <MainContainerDiv>
          <p>
            1 {this.state.tokenPair.from} =
            {this.state.order.metadata.source.price} {this.state.tokenPair.to}
          </p>
          <CoinForm
            changeTokenTo={this.changeTokenTo}
            changeTokenFrom={this.changeTokenFrom}
            tokenPair={this.state.tokenPair}
          />
        </MainContainerDiv>
      </MainPageDiv>
    );
  }
}

export default Authentication(App);
