import { MutationTree } from 'vuex';
import { IRequest, IRequests } from './state';

const mutation: MutationTree<IRequests> = {
  setRequests( state: IRequests, requests: IRequest[] ) {
    state.requests = requests
  },
};

export default mutation;
