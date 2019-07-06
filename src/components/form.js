import React, { Component } from 'react';
import styled from 'styled-components';

/********************************************** Styles ********************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  form,
  select {
    margin: 10px 0px 10px 0px;
    background: transparent;
    color: white;
    display: flex;
    flex-direction: column;
  }
`;
const NiceButton = styled.button`
  margin-top: 10px;

  height: 30px;
  width: 200px;
  border-radius: 7px;
  background: ${props => (props.color === 'true' ? 'orange' : 'cyan')};
  outline: none;
  :hover {
    box-shadow: 2px 2px 15px rgba(94, 255, 252, 0.8);
    cursor: pointer;
  }
  :last-child {
    margin-bottom: 10px;
  }
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
        <label htmlFor="from"> This... </label>
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
        <form>
          <label> amount to exchange ...</label>
          <input
            onChange={e => changeAmount(e.target.value)}
            type="number"
            value={this.props.toAmount}
          />
        </form>

        <label htmlFor="to">For this...</label>
        <select
          defaultValue="ETH"
          id="to"
          onChange={e => changeTokenTo(e.target.value)}
        >
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
        <NiceButton color="true" onClick={makeTrade}>
          Make the Trade!
        </NiceButton>
      </DivWrapper>
    );
  }
}
