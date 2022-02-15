import { MutationTree } from 'vuex';
import { IDigitalSignature, IDigitalSignatures } from './state';

const mutation: MutationTree<IDigitalSignatures> = {
  setDigitalSignatures( state: IDigitalSignatures, digitalSignatures: IDigitalSignature[] ) {
    state.digitalSignatures = digitalSignatures
  },
};

export default mutation;
