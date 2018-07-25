import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import Notification from '../modals/notification';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchNotifications, updateNotifications } from '../../actions/notifications';
import eventtypes from './eventtypes';
import icon from './oval.png';
import icongrey from './icongrey.png';
class Notifications extends React.Component {
  state = { showPopup: false, eventText: '' };
  componentWillMount() {
    this.props.fetchNotifications();
  }
  closePopup = () => {
    this.setState({ showPopup: false });
  };

  labels = () => {
    return this.props.notifications.map((item, index) => {
      let date = moment(new Date(item.creation_date)).format('YYYY/MM/DD');
      return (
        <TableRow key={index} seen={item.seen}>
          <RowNotification>
            <RowNotificationIcon>{item.seen ? <img src={icongrey} /> : <img src={icon} />}</RowNotificationIcon>
            <RowNotificationText
              onClick={() => {
                this.setState({ eventText: eventtypes[item.event_type], showPopup: true });
              }}
            >
              {eventtypes[item.event_type]}
            </RowNotificationText>
          </RowNotification>
          <RowDate>{date} </RowDate>
        </TableRow>
      );
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
        <Notification
          eventText={this.state.eventText}
          close={() => {
            this.closePopup();
          }}
          showPopup={this.state.showPopup}
        />
        <Title>
          <h2>ОПОВЕЩЕНИЯ</h2>
        </Title>
        <Wrap>
          <TableBlock>
            <TableName>
              <b>Оповещение</b>
              <b>Дата</b>
            </TableName>
            {this.labels()}
          </TableBlock>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ fetchNotifications, updateNotifications }, dispatch);
const mapStateToProps = state => ({
  preloader: state.notifications.preloader,
  notifications: state.notifications.notifications
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Notifications);
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
  width: 90%;
  background: #ffffff;
  box-shadow: 0px 15px 40px rgba(163, 171, 186, 0.4);
  border-radius: 5px;
  margin: 20px 20px 40px 20px;

  border-radius: 10px;
  padding: 10px;
`;
const TableName = styled.div`
  margin-right: 40px;
  margin-left: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #dfe0e1;
  font-weight: 500;
`;
const TableRow = styled.div`
  color: ${props => (props.seen ? 'rgba(40, 47, 54, 0.467873)' : 'black')};
  margin-right: 40px;
  margin-left: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #dfe0e1;
`;
const RowNotification = styled.div`
  display: flex;
`;
const RowNotificationIcon = styled.div``;
const RowNotificationText = styled.div`
  margin-left: 10px;
`;
const RowDate = styled.div`
  color: rgba(40, 47, 54, 0.8);
`;
