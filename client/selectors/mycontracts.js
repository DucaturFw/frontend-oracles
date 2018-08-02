import { createSelector } from 'reselect';
import filter from 'lodash/filter';

const executerFilter = state => state.mycontracts.executer;
const statusFilter = state => state.mycontracts.status;
const contracts = state => state.mycontracts.contracts;

export const contractFilter = createSelector(contracts, statusFilter, executerFilter, (items, stats, execs) => {
  return filter(items, el => (!execs || el.party.some(e => e.key === execs)) && (!stats || el.status === stats));
});
