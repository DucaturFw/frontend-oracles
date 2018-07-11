import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
const data = [{ key: 'EN', value: 'EN', text: 'English' }, { key: 'RU', value: 'RU', text: 'Russia' }];
class Footer extends React.Component {
  render() {
    return (
      <Wrap>
        <Title>Oracles Framework</Title>

        <Right>
          <Menu>
            <StyledLink to="/">New Contract</StyledLink>
            <StyledLink to="/">My Contracts</StyledLink>
            <StyledLink to="/">Contacts</StyledLink>
          </Menu>
          <StyledDropdown size="mini" selection options={data} />
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
  font-size: 16px;
`;

const Title = styled.span`
  display: flex;
  padding: 20px 0px 20px 50px;
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
