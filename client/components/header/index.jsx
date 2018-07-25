import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ducatur from './logo.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../../actions/userinfo';
import iconmenu from './iconmenu.png';

class Header extends React.Component {
  componentWillMount() {
    this.props.fetchUserInfo();
  }

  render() {
    return (
      <Wrap>
        <Left>
          <Logo>
            <a href="https://ducatur.com/">
              <img src={ducatur} />
            </a>
          </Logo>
          <Menu>
            <StyledLink to={'/create'}>New Contract</StyledLink>
            <StyledLink to={'/my_contracts'}>My Contracts</StyledLink>
          </Menu>
        </Left>
        <Right>
          <Name>
            <UserInfoLink to={'/userinfo'}>
              {this.props.name} {this.props.family_name}
            </UserInfoLink>
          </Name>
          <Notification>
            <NotificationLink to={'/notifications'}>0</NotificationLink>
          </Notification>
          <img src={iconmenu} />
        </Right>
      </Wrap>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ fetchUserInfo }, dispatch);
const mapStateToProps = state => ({
  name: state.userinfo.userinfo.name,
  family_name: state.userinfo.userinfo.family_name
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Header);

const Wrap = styled.div`
  background-color: #ffffff;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Left = styled.div`
  display: flex;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 60px;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 16px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
  justify-content: flex-end;
`;
const Name = styled.span`
  display: inline-block;
  color: #000000;
  margin-right: 20px;
  font-size: 20px;
`;
const Notification = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #6987b9;
  color: #ffffff;
  border-radius: 50%;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
  color: ${props => (props.active ? '#8BE7FF' : '#6987B9')};
  margin-left: 20px;
  padding-left: 20px;
  &:hover,
  &:active {
    color: #6987b9;
    text-decoration: none;
  }
`;
const NotificationLink = styled(Link)`
  color: #ffffff;
  &:hover,
  &:active {
    color: #ffffff;
    text-decoration: none;
  }
`;
const UserInfoLink = styled(Link)`
  color: black;
  &:hover,
  &:active {
    color: black;
    text-decoration: none;
  }
`;
