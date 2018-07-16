import { combineReducers } from 'redux';

import mycontracts from '../reducers/mycontracts-reducer';
import createcontract from '../reducers/createcontract-reducer';
import notifications from '../reducers/notifications-reducer';
import userinfo from '../reducers/userinfo-reducer';
export const rootReducer = combineReducers({
  mycontracts,
  createcontract,
  notifications,
  userinfo
});
