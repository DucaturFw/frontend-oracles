import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/userinfo';
import doc from './doc.png';
import scan from './scan.png';
class Account extends React.Component {
  state = {
    name: '',
    family_name: '',
    email: '',
    eth_account: '',
    organization_name: '',
    tax_num: '',
    payment_num: ''
  };
  componentWillMount() {
    this.props.fetchUserInfo();
  }

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
                <StyledInput placeholder="Введите ваше имя" />
              </Item>

              <Item>
                <TitleField>
                  <b>Фамилия </b>
                </TitleField>
                <StyledInput placeholder="Введите вашу фамилию" />
              </Item>

              <Item>
                <TitleField>
                  <b>Email </b>
                </TitleField>
                <StyledInput placeholder="Введите ваш email" />
              </Item>

              <Item>
                <TitleField>
                  <b>Eth account</b>
                </TitleField>
                <StyledInput placeholder="Введите ваш eth аккаунт" />
              </Item>

              <Item>
                <TitleField>
                  <b>Имя организации</b>
                </TitleField>
                <StyledInput placeholder="Введите имя организации" />
              </Item>
              <Item>
                <TitleField>
                  <b>ИНН</b>
                </TitleField>
                <StyledInput placeholder="Введите ваш ИНН" />
              </Item>
              <Item>
                <TitleField>
                  <b>Рассчётный счет</b>
                </TitleField>
                <StyledInput placeholder="Введите ваш расчётный счёт" />
              </Item>
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
                  <b>Номер счета</b>
                </TitleField>
                <StyledInput placeholder="Ваш номер счета" />
              </Item>
            </Block>
          </Wrap2>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ fetchUserInfo }, dispatch);
const mapStateToProps = state => ({
  preloader: state.userinfo.preloader,
  contracts: state.userinfo.userinfo
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
  height: 20rem;
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
