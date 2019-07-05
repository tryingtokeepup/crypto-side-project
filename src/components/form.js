import React, { Component } from 'react';
import styled from 'styled-components';

/********************************************** Styles ********************************************/
const DivWrapper = styled.div``;

/********************************************* Component ******************************************/

export default class CoinForm extends Component {
  //console.log("i'm here in form", props);
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DivWrapper>
        <select default={this.state.tokenPair}>
          <option value="ticker1">{this.props.tokenPair.to}</option>
          <option value="ticker2">{this.props.tokenPair.from}</option>
          <option value="ticker3">something</option>
        </select>
      </DivWrapper>
    );
  }
}
