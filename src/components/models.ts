export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface IRequestData {
  inn: string | null
  passport: File | null
  snils: File | null
  powerOfAttorneyMvm: File | null
  otherDocs: File | null
}
