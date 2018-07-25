import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import file from './file.png';
import Dispute from '../modals/dispute';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadData } from '../../actions/contract';

class Contract extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    props.loadData(props.match.params.id);
  }
  state = { showPopup: false };

  onDisputeClick = () => {
    this.setState({ showPopup: true });
  };

  closePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    if (!this.props.contract.id) {
      return (
        <Wrap>
          <LoadingWrap>
            <FA name="spinner" size="4x" spin />
          </LoadingWrap>
        </Wrap>
      );
    }

    if (this.props.error) {
      return (
        <Wrap>
          <LoadingWrap>
            <h1>Не удалось загрузить контракт</h1>
          </LoadingWrap>
        </Wrap>
      );
    }

    return (
      <Fragment>
        <Title>
          <h2>Contract #{this.props.contract.id}</h2>
        </Title>
        <Wrap>
          <Dispute
            showPopup={this.state.showPopup}
            close={() => {
              this.closePopup();
            }}
          />

          <Wrap2>
            <StepBlock>
              <TitleField>
                <b>Контракт</b>
              </TitleField>
              <Galochka />
              <StepText>Начало работы</StepText>
              <Galochka />
              <StepText>Возможен диспут</StepText>
              <Galochka />
              <StepText>Выплата</StepText>
              <Galochka />
              <StepText>Завершение контракта</StepText>
            </StepBlock>
            <Block>
              <Item>
                <TitleField>
                  <b>Заказчик: </b>
                  {this.props.contract.in_party.length > 0
                    ? this.props.contract.in_party[0].info.organization_name
                    : ''}
                </TitleField>
              </Item>
              {this.props.contract.in_party.length > 1 && (
                <Item>
                  <TitleField>
                    <b>Испонитель: </b>
                    {this.props.contract.in_party[1].info.organization_name}
                  </TitleField>
                </Item>
              )}
            </Block>
            <StagesBlock>
              <TitleSegment> Стадии контракта</TitleSegment>
              <Answer>?</Answer>
            </StagesBlock>
            {this.props.contract.stages.map((stage, idx) => {
              return (
                <Block>
                  <Stage>Этап {idx + 1}</Stage>
                  <Item>
                    <TitleField>
                      <b>Начало действия: </b>
                      {stage.start}
                    </TitleField>
                  </Item>
                  <Item>
                    <TitleField>
                      <b>Дата допущения открытия диспута: </b>
                      {stage.dispute_start_allowed}
                    </TitleField>
                  </Item>
                </Block>
              );
            })}
            <StagesBlock>
              <TitleSegment>МАТЕРИАЛЫ КОНТРАКТА</TitleSegment>
              <Answer>?</Answer>
            </StagesBlock>
            <FilesBlock>
              <File>
                <a>
                  <img src={file} />
                </a>
                <p> Текстконтракта.doc</p>
              </File>
              <File>
                <a>
                  <img src={file} />
                </a>
                <p> NDA.doc</p>
              </File>
            </FilesBlock>
            <ButtonsBlock>
              <ButtonOpenDispute onClick={() => this.onDisputeClick()}>Открыть диспут</ButtonOpenDispute>
              <ButtonCloseContract>Завершить контракт</ButtonCloseContract>
            </ButtonsBlock>
          </Wrap2>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ loadData }, dispatch);
const mapStateToProps = state => ({
  contract: state.contract.contract
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Contract);

const LoadingWrap = styled.div`
  height: 400px;
  text-align: center;
  padding-top: 200px;
`;

const Wrap = styled.div`
  width: 60rem;
  min-height: 20rem;
  background: #ffffff;
  display: block;
  margin-top: 20px;
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
  line-height: 36px;
  font-size: 36px;
  letter-spacing: 1.28571px;
  margin-top: 15px;
`;
const StepBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eeeeee;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 20px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
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
const Galochka = styled.div`
  border: 2px solid rgba(40, 47, 54, 0.3);
  transform: rotate(-90deg);
`;
const StepText = styled.span`
  line-height: 20px;
  font-size: 18px;
  color: #93979a;
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
`;
const FilesBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const File = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 5px;
  }
`;
const ButtonsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;
const ButtonOpenDispute = styled.button`
display:flex;
font-size: 16px;
color: #FFFFFF;
justify-content: center;
align-items: center;
background: #9B9B9B;
border-radius: 22.5px;
width:183px
height:45px;
align-self:center;
margin-right:10px;

`;
const ButtonCloseContract = styled.button`
display:flex;
font-size: 16px;
color: #FFFFFF;
justify-content: center;
align-items: center;
background: #3EA5F5;
border-radius: 22.5px;
width:220px
height:45px;
align-self:center;

`;
