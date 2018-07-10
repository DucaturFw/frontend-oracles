import React, { Component } from 'react';
import styled from 'styled-components';

import Popup from './../elements/popup';

export default class Dispute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="faq" className="faq toggleable">
        <h1>faq</h1>
        <Container>bvnbvnbv</Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const Container = styled.div`
  /* overflow-y: auto; */
  padding-bottom: 30px;
`;
