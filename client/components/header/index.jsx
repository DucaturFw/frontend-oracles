import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ducatur from './logo.png';
import iconmenu from './iconmenu.png';
class Header extends React.Component {
  render() {
    return (
      <Wrap>
        <Logo>
          <a href="https://ducatur.com/">
            <img src={ducatur} />
          </a>
        </Logo>
        <Menu>
          <StyledLink to={'/'}>New Contract</StyledLink>
          <StyledLink to={'/mycontracts'}>My Contracts</StyledLink>
        </Menu>
        <Right>
          <Name>Ivan Ivanovich</Name>
          <Notification>
            <NotificationLink to={'/notifications'}>15</NotificationLink>
          </Notification>
          <img src={iconmenu} />
        </Right>
      </Wrap>
    );
  }
}
export default Header;

const Wrap = styled.div`
  background-color: #ffffff;
  height: 100px;
  display: flex;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  padding-top: 5px;
  padding-left: 30px;
  flex: 0 0 200px;
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
  justify-content: flex-end;
  flex: 0 0 55%;
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
  padding-left: 20px;
  &:hover,
  &:active {
    color: #6987b9;
    text-decoration: none;
  }
`;
const NotificationLink = styled(Link)`
  color: ${props => (props.active ? '#ffffff' : '#ffffff')};
  &:hover,
  &:active {
    color: #ffffff;
    text-decoration: none;
  }
`;
