import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

const data = [{ key: 'EN', value: 'EN', text: 'English' }, { key: 'RU', value: 'RU', text: 'Russia' }];
class Footer extends React.Component {
  render() {
    return (
      <Wrap>
        <Left>
          <Title>Dispute Resolution Machine</Title>
        </Left>
        <Right>
          <Menu>
            <StyledLink to="/createcontract">Новый Контракт</StyledLink>
            <StyledLink to="/mycontracts">Мои Контракты</StyledLink>
          </Menu>
          {/*<StyledDropdown size="mini" selection options={data} />*/}
        </Right>
      </Wrap>
    );
  }
}
export default Footer;

const Wrap = styled.div`
  background-color: #ffffff;
  height: 100px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;
const Left = styled.div`
  display: flex;
`;
const Title = styled.span`
  display: flex;
  padding: 30px 0px 0px 60px;
  flex: 0 0 250px;
  font-size: 20px;
  color: #352e6c;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
  justify-content: flex-end;
  flex: 0 0 75%;
`;

const StyledDropdown = styled(Dropdown)`
  &&& {
    background-color: #aacaff;
    color: #352e6c;
    border-radius: 5px;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => (props.active ? '#8BE7FF' : '#6987B9')};
  padding-left: 20px;
  &:hover,
  &:active {
    #color: #352e6c;
    text-decoration: none;
  }
`;
