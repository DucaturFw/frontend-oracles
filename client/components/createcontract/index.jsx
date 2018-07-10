import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { Dropdown, Checkbox } from 'semantic-ui-react';

import { DateInput } from 'semantic-ui-calendar-react';
const data1 = [{ key: '1', value: '1', text: 'Бобо' }, { key: '2', value: '2', text: 'Горо' }];
const data2 = [{ key: '1', value: '1', text: 'ИП Чебурекова' }, { key: '1', value: '1', text: 'Ип Шаурмечная' }];
const data3 = [{ key: '1', value: '1', text: 'Заказчик' }, { key: '1', value: '1', text: 'Исполнитель' }];

class CreateContract extends React.Component {
  state = { preloader: true };
  componentWillMount() {
    this.setState({ preloader: false });
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
      <Fragment>
        <Title>
          <h2>CREATE NEW CONTRACT</h2>
        </Title>
        <Wrap>
          <Wrap2>
            <ClientExecutorBlock>
              <Client>
                <TitleField>Заказчик</TitleField>
                <StyledDropdown size="mini" search selection options={data1} />
                <StyledCheckbox label="Я заказчик" />
              </Client>
              <Executor>
                <TitleField>Исполнитель</TitleField>
                <StyledDropdown size="mini" search selection options={data2} />
                <StyledCheckbox label="Я исполнитель" />
              </Executor>
            </ClientExecutorBlock>
            <StagesBlock>
              <TitleSegment>CТАДИИ КОНТРАКТА</TitleSegment>
              <Answer>?</Answer>
            </StagesBlock>
            <Stage>Этап 1 </Stage>
            <StagesContractBlock>
              <ContractText>
                <TitleField>Начало действия контракта</TitleField>
                <TitleField>Дата допущения открытия диспута</TitleField>
              </ContractText>
              <TimeContract>
                <StyledDateInput />
                <StyledDateInput />
              </TimeContract>
              <Responsible>
                <Item>
                  <TitleField>Отвественный</TitleField>
                  <StyledDropdown2 size="mini" search selection options={data3} />
                </Item>
              </Responsible>
            </StagesContractBlock>

            <ButtonaddStage>+ Добавить стадию контрактка</ButtonaddStage>
            <StagesBlock>
              <TitleSegment>МАТЕРИАЛЫ КОНТРАКТА</TitleSegment>
              <Answer>?</Answer>
            </StagesBlock>
            <MaterialBlock>
              <ButtonaddMaterial>+</ButtonaddMaterial>
            </MaterialBlock>
            <ButtonCreateContract>Создать контракт -></ButtonCreateContract>
          </Wrap2>
        </Wrap>
      </Fragment>
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
  width: 60rem;
  height: 20rem;
  background: #ffffff;
  display: block;
  margin-top: 20px;
  margin-bottom: 40px;
  overflow-x: hidden;
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #352e6c;
  font-weight: 500;
  font-size: 22px;
  margin-top: 15px;
`;
const TitleField = styled.span`
  color: #282f36;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;
const TitleSegment = styled.span`
  font-size: 24px;
  color: #352e6c;
  text-align: center;
`;
const ClientExecutorBlock = styled.div`
  flex: 0 0 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
  margin-bottom: 50px;
`;
const Client = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Executor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Stage = styled.div`
  padding: 5px;
  margin-top: 10px;
  border: 1px solid #aacaff;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  color: #282f36;
  height: 41px;
  width: 131px;
`;
const StagesContractBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;
const ContractText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const TimeContract = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
`;
const Responsible = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StagesBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Answer = styled.div`
  border: 2px solid rgba(40, 47, 54, 0.15);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center
  align-items:center;
  align-self:center;
  border-radius: 10px;
  font-size: 24px;
  height: 26px;
  width: 26px;
  color: #dfe0e1;
  margin-left:10px;

`;
const MaterialBlock = styled.div`
  margin-top: 20px;
  display: flex;
  align-self: center;
  justify-content: center;
`;
const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 5px;
    margin-top: 10px;
  }
`;
const StyledDropdown2 = styled(Dropdown)`
  &&& {
    border-radius: 5px;
    margin-left: 10px;
  }
`;
const StyledCheckbox = styled(Checkbox)`
  &&& {
    margin-top: 10px;
  }
`;

const StyledDateInput = styled(DateInput)`
padding:5px
  width: 100px;
`;
const ButtonaddStage = styled.button`
margin-top:20px
margin-bottom:20px;
display:flex;
font-size: 16px;
color: #FFFFFF;
justify-content: center;
align-items: center;
background: #3EA5F5;
border-radius: 18.5px;
width:300px
height:40px;
align-self:center;
`;
const ButtonaddMaterial = styled.button`
display:flex;
font-size: 16px;
color: #CFCFCF;
justify-content: center;
align-items: center;
background: #FFFFFF;
border: 4px dotted black; 
width:65px
height:65px;
align-self:center;
`;

const ButtonCreateContract = styled.button`
margin-top:20px
margin-bottom:30px;
display:flex;
font-size: 16px;
color: #FFFFFF;
justify-content: center;
align-items: center;
background: #3EA5F5;
border-radius: 18.5px;
width:225px
height:45px;
align-self:center;
`;
