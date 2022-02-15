import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IDigitalSignatures } from './state';

const getters: GetterTree<IDigitalSignatures, StateInterface> = {
  getDigitalSignatures( context ) {
    return context.digitalSignatures
  },
};

export default getters;
