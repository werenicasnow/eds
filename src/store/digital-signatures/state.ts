export interface IDigitalSignature {
  id: number,
  name: string,
  status: string,
  owner: number,
  MVCAccessCard: string,
  serialNumber: string,
  startDate: string,
  endDate: string,
}

export interface IDigitalSignatures {
  digitalSignatures: IDigitalSignature[]
}

function state(): IDigitalSignatures {
  return {
    digitalSignatures: [],
  };
}

export default state;
