import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Authentication from './components/auth.js';
import CoinForm from './components/form';
import DEXAG from 'dexag-sdk';
import investingImg from './undraw_investing.svg';

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
    /* background: linear-gradient(to right, #282c34 0%, rgba(42, 38, 38, 0.5) 100%); */

    background-color: #282c34;
    margin : 0 auto;
    height: 100%
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }

`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  button {
    height: 30px;
    width: 100px;
    margin-top: 10px;
    border-radius: 7px;
    outline: none;
    :hover {
      box-shadow: 2px 2px 15px rgba(94, 255, 252, 0.8);
      cursor: pointer;
    }
  }
`;
const P = styled.p`
  font-size: 20px;
  cursor: pointer;
  color: ${props => (props.buy ? 'yellow' : 'white')};
  text-decoration: ${props => (props.buy ? 'underline' : 'null')};
`;
const Investing = styled.img`
  width: 400px;
`;
const MainPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const orderModel = {
  metadata: {
    source: {}
  }
};

const MainContainerDiv = styled.div`
  border: 1px solid white;

  display: flex;
  border-radius: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  min-width: 300px;
  border: 1px solid white;
  background: #0d1d36;
  box-shadow: 3px 3px 1px rgba(103, 128, 159, 1);
  text-align: center;

  p span {
    font-weight: bolder;
    line-height: 1.5;
  }
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
      loaded: false,
      loading: false,
      toAmount: 1,
      name: 'Jai'
    };
  }

  findTrade = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    let { tokenPair, toAmount, type } = this.state;
    console.log('Firing Find Trade');

    const tradeObject = () => {
      if (type === 'buy') {
        return {
          to: tokenPair.to,
          from: tokenPair.from,
          toAmount: toAmount,
          type: type,
          dex: 'Best'
        };
      } else {
        return {
          to: tokenPair.from,
          from: tokenPair.to,
          fromAmount: toAmount,
          type: type,
          dex: 'Best'
        };
      }
    };
    console.log(tradeObject());
    const trade = await sdk.getTrade(tradeObject());
    console.log(trade);
    this.setState({ ...this.state, order: trade, loading: false });
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
  };
  changeAmount = newAmount => {
    console.log(newAmount);
    this.setState({ toAmount: newAmount });
  };
  componentDidMount() {
    sdk.registerStatusHandler((status, data) => {
      this.setState({ web3Status: { status, data } });
      this.timeoutStatus(status);
      console.log(status);
    });

    // find the price for default pair
    // this.findTrades();
  }
  timeoutStatus = status => {
    // hide rejected message
    if (status === 'rejected')
      setTimeout(() => {
        this.closeStatus();
      }, 3500);
  };
  makeTrade = async () => {
    let { order } = this.state;
    // start web3 validation process
    const valid = await sdk.validate(order);
    alert('Bitcoin Wallet integration is not yet finished, sorry. :(');
    if (valid) {
      // web3 is valid, trade order
      sdk.trade(order);
    }
  };
  // changeName() {
  //   let name = prompt('Please enter your name', 'Harry Potter');
  //   console.log(name);
  //   this.setState({ ...this.state, name: 'Kai' });
  // }

  render() {
    // console.log('trial = ', this.state.order);
    // console.log(this.state.tokenPair);
    // console.log(this.state.order.metadata.source.price);
    return (
      <MainPageDiv>
        <GlobalStyle />
        <Header>
          <Investing src={investingImg} />
          <h1>Hey {this.state.name}!</h1>
          <button
            onClick={() => {
              let name = prompt('Please enter your name', 'Harry Potter');
              this.setState({ name: name });
            }}
          >
            Name Change
          </button>
          <div>
            <P
              onClick={() => {
                this.setState({ type: 'buy' });
              }}
              buy={this.state.type === 'buy'}
            >
              Buy
            </P>
            <P
              onClick={() => {
                this.setState({ type: 'sell' });
              }}
              buy={this.state.type === 'sell'}
            >
              Sell
            </P>
          </div>
          <p>Start trading. 😁</p>
        </Header>
        <MainContainerDiv>
          <p>
            {this.state.type === 'buy' ? 'Pay' : 'Recieve'} :{' '}
            {this.state.toAmount} {this.state.tokenPair.from} ={' '}
            {this.state.type === 'buy' ? 'For' : 'For'}{' '}
            {this.state.order.metadata.source.price !== undefined &&
              Number.parseFloat(
                this.state.order.metadata.source.price * this.state.toAmount
              ).toFixed(3) + ' '}
            {this.state.tokenPair.to}
            <br />
            <span>
              {this.state.order.metadata.source.dex != undefined &&
                `Best Price found at : ${this.state.order.metadata.source.dex}`}
            </span>
            {/* this.state.order.metadata.source && */}
          </p>
          <CoinForm
            amount={this.state.toAmount}
            changeTokenTo={this.changeTokenTo}
            changeTokenFrom={this.changeTokenFrom}
            changeAmount={this.changeAmount}
            tokenPair={this.state.tokenPair}
            findTrade={this.findTrade}
            makeTrade={this.makeTrade}
          />
        </MainContainerDiv>
        {this.state.loading && <p>"Loading your data! 😆 "</p>}
      </MainPageDiv>
    );
  }
}

export default Authentication(App);
