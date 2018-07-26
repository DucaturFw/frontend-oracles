import { createSelector } from 'reselect';
import filter from 'lodash/filter';
const clientFilter = state => state.mycontracts.client;
const executerFilter = state => state.mycontracts.executer;
const statusFilter = state => state.mycontracts.status;
const contracts = state => state.mycontracts.contracts;
export const contractFilter = createSelector([contracts, clientFilter, executerFilter], items => {
  return filter(items, el => {
    return el.client.indexOf(clientFilter) && el.executer.indexOf(executerFilter) && el.status.indexOf(statusFilter);
  });
});
