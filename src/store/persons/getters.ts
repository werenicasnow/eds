import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IPersons } from './state';

const getters: GetterTree<IPersons, StateInterface> = {
  getPersons( context ) {
    return context.persons
  },
};

export default getters;
