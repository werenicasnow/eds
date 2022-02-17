import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IRequests } from './state';

const getters: GetterTree<IRequests, StateInterface> = {
  getRequests( context ) {
    return context.requests
  },
  getUserRequests( context ) {
    return context.requests.filter(r => r.employee === 3)
  },
  getActiveRequests( context ) {
    return context.requests.filter(r => r.status !== 'Сертификат выпущен')
  },
  getTasks( context ) {
    return context.requests.filter(r => r.status === 'На согласовании')
  },
};

export default getters;
