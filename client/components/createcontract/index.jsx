
import React from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';


class CreateContract extends React.Component {
  componentWillMount() {
    this.setState({preloader:false})
  }



  render() {
    if (this.state.preloader) {
      return (
        <Wrap>
          <LoadingWrap>
            <FA name="spinner" size="4x" spin />
          </LoadingWrap>
        </Wrap>
      );
    }
    return (
      <Wrap>


      </Wrap>
    );
  }
}

export default CreateContract;
const LoadingWrap = styled.div`
    height: 400px;
    text-align: center;
    padding-top: 200px;
`;

const Wrap = styled.div`
 width:60rem;
`;

