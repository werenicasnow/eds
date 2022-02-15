export interface IRequest {
  id: string,
  employee: string,
  date: string,
  status: string,
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
