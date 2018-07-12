import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import Notification from '../modals/notification';
//import up from
const data = [
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' },
  { text: 'Оповещение', time: '01/08/2018' }
];
class Notifications extends React.Component {
  state = { preloader: true, notification: false };
  componentWillMount() {
    this.setState({ preloader: false });
  }

  get labels() {
    return (
      <TableBlock>
        <Table>
          <thead>
            <tr>
              <Cells>Address</Cells>
              <Cells>Tokens</Cells>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <CellItem>{item.text}</CellItem>
                  <CellItem>{item.data}</CellItem>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableBlock>
    );
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
        <Notification showPopup={false} />
        <Title>
          <h2>Contracts List</h2>
        </Title>
        <Test />
        <Wrap>{this.labels}</Wrap>
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
  margin-bottom: 20px;
`;

const TableBlock = styled.div`
  width: 100%;
  border: 1px solid #dfe0e1;
  padding: 10px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
`;
const Test = styled.span`
border: 2px solid rgba(40, 47, 54, 0.5);
transform: matrix(1, 0, 0, -1, 0, 0)
width:2px;
heuight:2px;
`;
const Cells = styled.td`
  padding: 6px;
  font-size: 12px;
`;
const CellFilter = styled.div`
  display: flex;
  flex-direction: column;
`;

const CellItem = styled(Cells)`
  border-top: 1px solid #dfe0e1;
`;
