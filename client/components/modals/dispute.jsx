import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, TextArea } from 'semantic-ui-react';

export default class Dispute extends Component {
  render() {
    if (!this.props.showPopup) return null;
    return (
      <Wrapper>
        <Container>
          <Title>Открытие диспута </Title>
          <FormBlock>
            <b>Причина:</b>
            <StyledForm>
              <TextArea placeholder="Напишите причину" />
            </StyledForm>
          </FormBlock>
          <ButtonBlock>
            <ButtonCancel
              onClick={() => {
                this.props.close();
              }}
            >
              Отмена
            </ButtonCancel>
            <ButtonOpenDispute
              onClick={() => {
                this.props.close();
              }}
            >
              Открыть диспут
            </ButtonOpenDispute>
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
  z-index: 1;
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
`;
const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonCancel = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:111px
height:45px;
font-weight: 500;
line-height: 20px;
color:#ffffff;
background: #9B9B9B;
border-radius: 22.5px;
margin-right:10px;

`;
const ButtonOpenDispute = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:182px
height:45px;
font-weight: 500;
line-height: 20px;
color:#ffffff;
background: #3EA5F5;
border-radius: 22.5px;

`;
const StyledForm = styled(Form)`
  margin-top: 20px;
  width: 20rem;
  height: 10rem;
`;
