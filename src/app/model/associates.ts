export interface IAssociates {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  associateGroup: string;
  status: boolean;
}

export interface IAssociateModel {
  list: IAssociates[];
  associateObj: IAssociates;
  errorMessage: string;
}
