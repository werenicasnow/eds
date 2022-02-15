import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IRequests } from './state';
import axios from 'app/node_modules/axios';

const actions: ActionTree<IRequests, StateInterface> = {
  async setRequests( {commit} ) {
    await axios.get('/data/requests.json').then((response) => {
      commit('setRequests', response.data)
    })
  },
};

export default actions;
