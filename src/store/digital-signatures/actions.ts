import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IDigitalSignatures } from './state';
import axios from 'app/node_modules/axios';

const actions: ActionTree<IDigitalSignatures, StateInterface> = {
  async setDigitalSignatures( {commit} ) {
    await axios.get('/data/digital_signatures.json').then((response) => {
      commit('setDigitalSignatures', response.data)
    })
  },
};

export default actions;
