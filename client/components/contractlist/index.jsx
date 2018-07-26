import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { push } from 'connected-react-router';
import {
  fetchContracts,
  changeClientFilter,
  changeExecuterFilter,
  changeStatusFilter
} from '../../actions/mycontracts';
import { contractFilter } from '../../selectors/mycontracts';

class ContractList extends React.Component {
  componentWillMount() {
    this.props.fetchContracts();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user_id && this.props.user_id) this.props.fetchContracts();
  }

  changeClientFilter = (event, data) => {
    this.props.changeClientFilter(data.value);
  };
  changeExecuterFilter = (event, data) => {
    this.props.changeExecuterFilter(data.value);
  };

  changeStatusFilter = (event, data) => {
    this.props.changeStatusFilter(data.value);
  };
  render() {
    const options = {
      onRowClick: row => {
        this.props.dispatch(push(`/contracts/${row.id}`));
      }
    };

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
          <h2>Contracts List</h2>
        </Title>
        <Wrap>
          <FilterBlock>
            <TitleFilter>Filter by </TitleFilter>
            <StyledDropdown
              size="mini"
              onChange={this.changeStatusFilter}
              value={this.props.status}
              search
              selection
              options={this.props.statuses}
            />
            <StyledDropdown
              size="mini"
              onChange={this.changeClientFilter}
              value={this.props.client}
              search
              selection
              options={this.props.clients}
            />
            <StyledDropdown
              size="mini"
              onChange={this.changeExecuterFilter}
              value={this.props.executer}
              search
              selection
              options={this.props.executers}
            />
            <CreateContract
              onClick={() => {
                this.props.dispatch(push('/create'));
              }}
            >
              + Создать новый контракт
            </CreateContract>
          </FilterBlock>
          <BootstrapTable options={options} height="200px" width="300px" data={this.props.contracts}>
            <TableHeaderColumn dataSort dataField="id">
              #
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="client" isKey={true}>
              Заказчик
            </TableHeaderColumn>
            <TableHeaderColumn dataField="executer" dataSort>
              Исполнитель
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="starttime">
              Начало
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="dispute">
              Диспут
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="owner">
              Отвественный
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="status">
              Статус
            </TableHeaderColumn>
          </BootstrapTable>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ fetchContracts, changeClientFilter, changeExecuterFilter, changeStatusFilter }, dispatch)
});
const mapStateToProps = state => ({
  preloader: state.mycontracts.preloader,
  contracts: contractFilter(state),
  clients: state.mycontracts.clients,
  executers: state.mycontracts.executers,
  statuses: state.mycontracts.statuses,
  user_id: state.userinfo.selfinfo.id,
  client: state.mycontracts.client,
  executer: state.mycontracts.executer,
  status: state.mycontracts.status
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(ContractList);

const LoadingWrap = styled.div`
  height: 400px;
  text-align: center;
  padding-top: 200px;
`;

const Wrap = styled.div`
  max-width: 70rem;
  min-height: 20rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-margin-top: 20px;
  overflow-x: hidden;
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
const TitleFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.642857px;
  color: #282f36;
`;
const FilterBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 5px;
    margin-left: 10px;
  }
`;
const CreateContract = styled.button`
background: #3EA5F5;
border-radius: 18.5px
font-weight: 500;
line-height: 20px;
color: #FFFFFF;
margin-left:10px;
`;
