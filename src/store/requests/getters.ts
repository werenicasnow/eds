import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IRequests } from './state';
/*import { IPersons } from 'src/store/persons/state';*/

const getters: GetterTree<IRequests, StateInterface> = {
  getRequests( context ) {
    return context.requests
  },
};

export default getters;
