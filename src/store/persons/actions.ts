import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IPersons } from './state';
import axios from 'app/node_modules/axios';

const actions: ActionTree<IPersons, StateInterface> = {
  async setPersons( {commit} ) {
    await axios.get('/data/persons.json').then((response) => {
      commit('setPersons', response.data)
    })
  },
};

export default actions;
