import React, { Fragment } from 'react';
import styled from 'styled-components';
import FA from 'react-fontawesome';
import Notification from '../modals/notification';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchNotifications } from '../../actions/notifications';
import eventtypes from './eventtypes';
import icon from './oval.png';

class Notifications extends React.Component {
  state = { notification: false, eventText: '' };
  componentWillMount() {
    this.props.fetchNotifications();
  }

  labels = () => {
    return this.props.notifications.map(item => {
      let date = moment(new Date(item.creation_date)).format('YYYY/MM/DD');
      return (
        <TableRow>
          <RowNotification>
            <RowNotificationIcon>
              <img src={icon} />
            </RowNotificationIcon>
            <RowNotificationText
              onClick={() => {
                this.setState({ eventText: eventtypes[item.event_type], notification: true });
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
        <Notification eventText={this.state.eventText} showPopup={this.state.notification} />
        <Title>
          <h2>ОПОВЕЩЕНИЯ</h2>
        </Title>

        <Wrap>
          <TableBlock>{this.labels()}</TableBlock>
        </Wrap>
      </Fragment>
    );
  }
}

const mapDispatchtoProps = dispatch => bindActionCreators({ fetchNotifications }, dispatch);
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
const TableRow = styled.div`
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
