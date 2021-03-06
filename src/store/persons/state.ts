export interface IPerson {
  id: number,
  firstName: string,
  lastName: string,
  middleName: string,
}

export interface IPersons {
  persons: IPerson[]
}

function state(): IPersons {
  return {
    persons: [],
  };
}

export default state;
