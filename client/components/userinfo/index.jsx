import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../actions/userinfo';
import doc from './doc.png';
import scan from './scan.png';
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      family_name: props.family_name,
      email: props.email,
      eth_account: props.eth_account,
      organization_name: props.organization_name,
      tax_num: props.tax_num,
      payment_num: props.payment_num
    };
  }

  componentWillReceiveProps(props) {
    this.mapToState(props);
  }

  saveInfo = () => {
    this.props.updateUserInfo(this.state);
  };
  mapToState = props => {
    this.setState({
      name: props.name,
      family_name: props.family_name,
      email: props.email,
      eth_account: props.eth_account,
      organization_name: props.organization_name,
      tax_num: props.tax_num,
      payment_num: props.payment_num
    });
  };
  render() {
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
        <Title>
          <h2>Аккаунт</h2>
        </Title>
        <Wrap>
          <Wrap2>
            <Block>
              <Segment>
                <TitleSegment>Личная информация</TitleSegment>
              </Segment>
              <Item>
                <TitleField>
                  <b>Имя</b>
                </TitleField>
                <StyledInput
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                  placeholder="Введите ваше имя"
                />
              </Item>

              <Item>
                <TitleField>
                  <b>Фамилия </b>
                </TitleField>
                <StyledInput
                  value={this.state.family_name}
                  onChange={e => {
                    this.setState({ family_name: e.target.value });
                  }}
                  placeholder="Введите вашу фамилию"
                />
              </Item>

              <Item>
                <TitleField>
                  <b>Email </b>
                </TitleField>
                <StyledInput
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  placeholder="Введите ваш email"
                />
              </Item>

              <Item>
                <TitleField>
                  <b>Eth account</b>
                </TitleField>
                <StyledInput
                  value={this.state.eth_account}
                  onChange={e => {
                    this.setState({ eth_account: e.target.value });
                  }}
                  placeholder="Введите ваш eth аккаунт"
                />
              </Item>

              <Item>
                <TitleField>
                  <b>Имя организации</b>
                </TitleField>
                <StyledInput
                  value={this.state.organization_name}
                  onChange={e => {
                    this.setState({ organization_name: e.target.value });
                  }}
                  placeholder="Введите имя организации"
                />
              </Item>
              <Item>
                <TitleField>
                  <b>ИНН</b>
                </TitleField>
                <StyledInput
                  value={this.state.tax_num}
                  onChange={e => {
                    this.setState({ tax_num: e.target.value });
                  }}
                  placeholder="Введите ваш ИНН"
                />
              </Item>
              <ButtonBlock>
                <ButtonSave
                  onClick={() => {
                    this.saveInfo();
                  }}
                >
                  Сохранить
                </ButtonSave>
              </ButtonBlock>
            </Block>
            <Block>
              <Segment>
                <TitleSegment>Документы</TitleSegment>
              </Segment>
              <FilesBlock>
                <File>
                  <a>
                    <img src={doc} />
                  </a>
                  <p>ОГРН.jpg</p>
                </File>
                <File>
                  <ButtonaddMaterial>
                    <a>
                      <img src={scan} />
                    </a>
                  </ButtonaddMaterial>
                </File>
              </FilesBlock>
              <Item>
                <TitleField>
                  <b>Рассчётный счет</b>
                </TitleField>
                <StyledInput
                  value={this.state.payment_num}
                  onChange={e => {
                    this.setState({ payment_num: e.target.value });
                  }}
                  placeholder="Введите ваш расчётный счёт"
                />
              </Item>
            </Block>
          </Wrap2>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ updateUserInfo }, dispatch);
const mapStateToProps = state => ({
  preloader: state.userinfo.preloader,
  name: state.userinfo.userinfo.name,
  family_name: state.userinfo.userinfo.family_name,
  email: state.userinfo.userinfo.email,
  eth_account: state.userinfo.userinfo.info.eth_account,
  organization_name: state.userinfo.userinfo.info.organization_name,
  tax_num: state.userinfo.userinfo.info.tax_num,
  payment_num: state.userinfo.userinfo.info.payment_num
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Account);
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
  flex-direction: row;
  justify-content: space-around;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #352e6c;
  font-weight: 500;
  font-size: 22px;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleField = styled.span`
  color: #282f36;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
`;
const Segment = styled.div`
  margin-bottom: 20px;
`;
const TitleSegment = styled.span`
  font-size: 24px;
  color: #352e6c;
`;
const StyledInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  border: 1px solid rgba(40, 47, 54, 0.15);
  box-sizing: border-box;
  border-radius: 5px;
  width: 363px;
  height: 40px;
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
`;
const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 40px 0px 0px 300px;
`;
const ButtonSave = styled.div`
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
text-align:center;

`;
