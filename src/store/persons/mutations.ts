import { MutationTree } from 'vuex';
import { IPerson, IPersons } from './state';

const mutation: MutationTree<IPersons> = {
  setPersons( state: IPersons, persons: IPerson[] ) {
    state.persons = persons
  },
};

export default mutation;
