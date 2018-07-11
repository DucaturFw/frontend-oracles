import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import { Dropdown } from 'semantic-ui-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const data = [
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  },
  {
    number: 1,
    client: 'Ivan Ivanovich',
    executer: 'ИП Иванов',
    starttime: '01/01/2018',
    endtime: '01/01/2018',
    dispute: '01/01/2018',
    status: 'Ожидание'
  }
];
class Notifications extends React.Component {
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
          <h2>Contracts List</h2>
        </Title>
        <Wrap>
          <FilterBlock>
            <TitleFilter>Filter by </TitleFilter>
            <StyledDropdown size="mini" search selection options={data} />
            <StyledDropdown size="mini" search selection options={data} />
            <StyledDropdown size="mini" search selection options={data} />
          </FilterBlock>
          <BootstrapTable height="200px" width="300px" data={data}>
            <TableHeaderColumn dataSort dataField="number">
              #
            </TableHeaderColumn>

            <TableHeaderColumn dataField="executer" dataSort>
              Исполнитель
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="starttime">
              Начало
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="endtime">
              Завершение
            </TableHeaderColumn>
            <TableHeaderColumn dataSort dataField="dispute">
              Диспут
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

export default Notifications;
const LoadingWrap = styled.div`
  height: 400px;
  text-align: center;
  padding-top: 200px;
`;

const Wrap = styled.div`
  width: 60rem;
  height: 20rem;
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
const TitleFilter = styled.span`
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
const StyledTable = styled(BootstrapTable)`
  overflow-x: hidden;
`;
