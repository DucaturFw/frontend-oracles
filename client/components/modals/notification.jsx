import React, { Component } from 'react';
import styled from 'styled-components';

export default class Notification extends Component {
  state = {
    showPopup: this.props.showPopup
  };
  render() {
    if (!this.state.showPopup) return null;
    return (
      <Wrapper>
        <Container>
          <Title>Оповещение</Title>
          <DataTitle>11/08/2018</DataTitle>
          <TextBlock>
            <p>
              Сообщаем вам что диспут успешно открыт. Сообщаем вам что диспут успешно открыт. Сообщаем вам что диспут
              успешно открыт. Сообщаем вам что диспут успешно открыт.{' '}
            </p>
          </TextBlock>
          <ButtonBlock>
            <ButtonCancel
              onClick={() => {
                this.setState({ showPopup: false });
              }}
            >
              Ок
            </ButtonCancel>
          </ButtonBlock>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(40, 47, 54, 0.86);
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 527px;
  height: 371px;
  border: 1px solid rgba(40, 47, 54, 0.15);
  box-sizing: border-box;
  border-radius: 5px;
  background: rgb(255, 255, 255);
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #352e6c;
  font-weight: 500;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 2px;
`;
const DataTitle = styled.div`
  display: flex;
  justify-content: center;
  line-height: 20px;
  font-size: 14px;
  color: rgba(40, 47, 54, 0.8);
  margin-top: 20px;
`;
const TextBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #282f36;
  margin-bottom: 20px;
`;
const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonCancel = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:122px
height:45px;
font-weight: 500;
line-height: 20px;
color:#ffffff;
background: #3EA5F5;
border-radius: 22.5px;
margin-right:10px;

`;
