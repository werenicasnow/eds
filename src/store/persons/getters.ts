import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IPersons } from './state';

const getters: GetterTree<IPersons, StateInterface> = {
  getPersons( context ) {
    return context.persons
  },
  getPerson( context ) {
    return (id: number) => context.persons.find(p => p.id === id)
  },
};

export default getters;
