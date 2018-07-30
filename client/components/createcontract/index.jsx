import React, { Fragment } from 'react';
import styled from 'styled-components';
import FileInput from '@team-griffin/react-file-input';
import FA from 'react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Checkbox, Form, Dimmer, Loader, Message } from 'semantic-ui-react';
import scan from './scan.png';
import row from './row.png';

import { DateInput } from 'semantic-ui-calendar-react';
import { fetchUsers, createContract, sendFileIpfs } from '../../actions/createcontract';
import moment from 'moment';

class CreateContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      executer: '',
      stages: [{ start: '', dispute_start_allowed: '', owner: '' }],
      filename: '',
      errorMsg: '',
      buffer: '',
      myid: null,
      idclient: null,
      idexecuter: null
    };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  createArrayResponsible = () => {
    return this.props.users.filter(u => u.value === this.state.client || u.value === this.state.executer);
  };

  addstage = () => {
    const array = this.state.stages;
    array.push({ start: '', dispute_start_allowed: '', owner: '' });
    this.setState({ stages: array });
  };

  captureFile = event => {
    this.setState({ filename: event.target.files[0].name });
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async reader => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    this.props.sendFileIpfs(buffer);
  };

  createContract = () => {
    this.setState({ errorMsg: '' });
    if (!this.state.client || !this.state.executer) {
      this.setState({ errorMsg: 'Исполнитель или заказчик заполнены неверно' });
      return;
    }

    if (
      !this.state.stages.reduce(
        (old, stage) => old || !stage.start || !stage.dispute_start_allowed || !stage.owner,
        true
      )
    ) {
      this.setState({ errorMsg: 'Этапы заполнены неверно' });
      return;
    }

    const data = {
      party: [this.state.client, this.state.executer],
      stages: this.state.stages.map(s => ({
        ...s,
        start: moment(s.start, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        dispute_start_allowed: moment(s.dispute_start_allowed, 'DD-MM-YYYY').format('YYYY-MM-DD')
      })),
      files: this.props.hash
    };

    this.props.createContract(data);
  };

  deleteStage = idx => {
    const stgs = this.state.stages;
    stgs.splice(idx, 1);
    this.setState({
      stages: stgs
    });
  };

  toggleclient = () => {
    this.setState({ idclient: this.props.myid });
  };

  toggleexcuter = () => {
    this.setState({ idexecuter: this.props.myid });
  };

  createstage = () => {
    return this.state.stages.map((item, index) => {
      return (
        <Fragment key={index}>
          <Stage>
            Этап {index + 1}
            {(index && (
              <span style={{ color: '#ffbbbb', cursor: 'pointer' }} onClick={() => this.deleteStage(index)}>
                &nbsp;&nbsp;X
              </span>
            )) ||
              ''}
          </Stage>
          <StagesContractBlock>
            <ContractText>
              <TitleField>Начало действия контракта</TitleField>
              <TitleField>Дата допущения открытия диспута</TitleField>
            </ContractText>
            <TimeContract>
              <StyledDateInput
                key={1}
                value={this.state.stages[index].start}
                onChange={(event, { value }) => {
                  let array = this.state.stages;
                  array[index].start = value;
                  this.setState({
                    stages: array
                  });
                }}
              />
              <StyledDateInput
                key={2}
                value={this.state.stages[index].dispute_start_allowed}
                onChange={(event, { value }) => {
                  let array = this.state.stages;
                  array[index].dispute_start_allowed = value;
                  this.setState({
                    stages: array
                  });
                }}
              />
            </TimeContract>
            <Responsible>
              <Item>
                <TitleField>Отвественный</TitleField>
                <StyledDropdown2
                  size="mini"
                  search
                  selection
                  onChange={(event, data) => {
                    let array = this.state.stages;
                    array[index].owner = data.value;
                    this.setState({
                      stages: array
                    });
                  }}
                  options={this.createArrayResponsible()}
                />
              </Item>
            </Responsible>
          </StagesContractBlock>
        </Fragment>
      );
    });
  };

  render() {
    const { users } = this.props;
    if (this.props.preloader) {
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
        {(this.state.errorMsg || this.props.error) && (
          <Message negative>
            <Message.Header>{this.state.errorMsg || this.props.error}</Message.Header>
          </Message>
        )}
        <Dimmer active={this.props.loadingcontract}>
          <Loader indeterminate>Creating contract</Loader>
        </Dimmer>
        <Title>
          <h2>Заключить новый контракт</h2>
        </Title>
        <Wrap>
          <Form>
            <Wrap2>
              <ClientExecutorBlock>
                <Client>
                  <TitleField>Заказчик</TitleField>
                  <StyledDropdown
                    size="mini"
                    onChange={(event, data) => {
                      this.setState({
                        client: data.value,
                        idclient: data.value
                      });
                    }}
                    value={this.state.idclient}
                    search
                    selection
                    options={users}
                  />
                  <StyledCheckbox onChange={this.toggleclient} label="Я заказчик" />
                </Client>
                <Executor>
                  <TitleField>Исполнитель</TitleField>
                  <StyledDropdown
                    onChange={(event, data) => {
                      this.setState({
                        executer: data.value,
                        idexecuter: data.value
                      });
                    }}
                    value={this.state.idexecuter}
                    size="mini"
                    search
                    selection
                    options={users}
                  />
                  <StyledCheckbox onChange={this.toggleexcuter} label="Я исполнитель" />
                </Executor>
              </ClientExecutorBlock>
              <StagesBlock>
                <TitleSegment>CТАДИИ КОНТРАКТА</TitleSegment>
                <Answer>?</Answer>
              </StagesBlock>

              {this.createstage()}
              <ButtonaddStage
                onClick={() => {
                  this.addstage();
                }}
              >
                + Добавить стадию контракта
              </ButtonaddStage>
              <StagesBlock>
                <TitleSegment>МАТЕРИАЛЫ КОНТРАКТА</TitleSegment>
                <Answer>?</Answer>
              </StagesBlock>
              <MaterialBlock>
                <FileInput
                  id={'test'}
                  value={[{ name: this.state.filename }]}
                  button={
                    <ButtonaddMaterial>
                      <img src={scan} />
                    </ButtonaddMaterial>
                  }
                  onChange={this.captureFile}
                />
              </MaterialBlock>

              <ButtonCreateContract onClick={this.createContract}>
                Создать контракт <img src={row} />
              </ButtonCreateContract>
            </Wrap2>
          </Form>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ fetchUsers, sendFileIpfs, createContract }, dispatch);
const mapStateToProps = state => ({
  preloader: state.createcontract.preloader,
  users: state.createcontract.users,
  error: state.createcontract.error,
  loadingcontract: state.createcontract.loadingcontract,
  myid: state.userinfo.userinfo.id,
  hash: state.createcontract.hash
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CreateContract);

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
  line-height: 36px;
  font-size: 36px;
  letter-spacing: 1.28571px;
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
  align-items: center;
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
  width: 150px;
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
border: 4px dashed #CFCFCF; 
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
