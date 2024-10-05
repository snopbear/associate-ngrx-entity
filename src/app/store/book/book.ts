import { EntityState } from '@ngrx/entity';

export interface IBook {
  id: number;
  name: string;
  authEmail: string;
  authPhone: string;
  type: string;
  authAddress: string;
  bookGroup: string;
  status: boolean;
}

//extend entity here  the content
export interface IBookModel extends EntityState<IBook> {
  errorMessage: string;
  isLoading: boolean;
}
