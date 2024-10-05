import { createEntityAdapter } from '@ngrx/entity';
import { IBook, IBookModel } from './book';


export const bookAdapter = createEntityAdapter<IBook>({
  selectId: (book: IBook) => book.id,
  sortComparer: (a: IBook, b: IBook) => a.name.localeCompare(b.name),
});
export const BookState: IBookModel = bookAdapter.getInitialState({
  errorMessage: '',
  isLoading: false,
});
