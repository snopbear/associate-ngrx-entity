import {EntityState} from "@ngrx/entity";

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


//extend entity here  the content
export interface IAssociateModel extends EntityState<IAssociates> {
  errorMessage: string;
  isLoading: boolean;
}
