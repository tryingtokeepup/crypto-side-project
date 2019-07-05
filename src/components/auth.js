import React from 'react';
import styled from 'styled-components';

/********************************************** Styles ********************************************/
const DivWrapper = styled.div``;

/********************************************* Component ******************************************/

function isLoggedIn() {
  return true;
}
const name = 'James';
const Authentication = App =>
  class extends React.Component {
    render() {
      if (isLoggedIn() === true) {
        return <App />;
      } else {
        return <div>Hey {name}, please Login! </div>;
      }
    }
  };

export default Authentication;
