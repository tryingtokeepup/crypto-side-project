import React, { Component } from 'react';
import styled from 'styled-components';

/********************************************** Styles ********************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const NiceButton = styled.button`
  margin-top: 10px;

  height: 30px;
  width: 200px;
  border-radius: 7px;
  background: ${props => (props.color ? 'orange' : 'cyan')};
`;

/********************************************* Component ******************************************/

export default class CoinForm extends Component {
  //console.log("i'm here in form", props);
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      changeTokenTo,
      changeTokenFrom,
      changeAmount,
      findTrade,
      makeTrade
    } = this.props;

    return (
      <DivWrapper>
        <label htmlFor="to">Select the token to exchange to.</label>
        <select id="to" onChange={e => changeTokenTo(e.target.value)}>
          <option value="DAI">DAI</option>
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
          <option value="MKR">MKR</option>
          <option value="BAT">BAT</option>
          <option value="LINK">LINK</option>
          <option value="ZRX">ZRX</option>
          <option value="KNC">KNC</option>
          <option value="BNT">BNT</option>
          <option value="WBTC">WBTC</option>
          <option value="SUSD">SUSD</option>
          <option value="TUSD">TUSD</option>
          <option value="DGX">DGX</option>
          <option value="SNT">SNT</option>
        </select>
        <form>
          <input
            onChange={e => changeAmount(e.target.value)}
            type="number"
            value={this.props.toAmount}
          />
        </form>
        <label htmlFor="from">Select the token to exchange from.</label>
        <select id="from" onChange={e => changeTokenFrom(e.target.value)}>
          <option value="DAI">DAI</option>
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
          <option value="MKR">MKR</option>
          <option value="BAT">BAT</option>
          <option value="LINK">LINK</option>
          <option value="ZRX">ZRX</option>
          <option value="KNC">KNC</option>
          <option value="BNT">BNT</option>
          <option value="WBTC">WBTC</option>
          <option value="SUSD">SUSD</option>
          <option value="TUSD">TUSD</option>
          <option value="DGX">DGX</option>
          <option value="SNT">SNT</option>
        </select>
        <NiceButton onClick={findTrade}>Submit</NiceButton>
        <NiceButton color onClick={makeTrade}>
          Make the Trade!
        </NiceButton>
      </DivWrapper>
    );
  }
}
