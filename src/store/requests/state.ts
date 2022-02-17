export interface IRequest {
  id: number,
  employee: number,
  date: string,
  status: string,
  comment: string,
  inn: string,
  passport: string,
  snils: string,
  powerOfAttorneyMvm: string,
  otherDocs: string,
}

export interface IRequests {
  requests: IRequest[]
}

function state(): IRequests {
  return {
    requests: [],
  };
}

export default state;
