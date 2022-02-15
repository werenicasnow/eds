import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IRequests } from './state';
/*import { IPersons } from 'src/store/persons/state';*/

const getters: GetterTree<IRequests, StateInterface> = {
  getRequests( context ) {
    return context.requests
  },

  getRequestsJoinPersons(context, getters, rootState: StateInterface/*, rootGetters: GetterTree<IRequests | IPersons, StateInterface>*/) {
    //const persons = rootGetters['persons/getPersons'];
    const persons = rootState.persons;
    //const requests = context.requests;
    //requests.forEach(r => r.fio = persons.find(p => p.id === r.employee));
    //requests.forEach(r => {
      //console.log(persons.find(p => p.id === 1));
      //r.employee = persons.find(p => p.id == r.employee)
    //})
    //console.log(persons);
    console.log(persons.find(p => p.id === '1'));
    return persons;
  }
};

export default getters;
