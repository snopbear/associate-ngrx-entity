import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { BookActionsType } from './book.types';
import { IBook } from './book';

//load
export const loadBook = createAction(BookActionsType.LOAD_BOOK);
export const loadBookSuccess = createAction(
  BookActionsType.LOAD_BOOK_SUCCESS,
  props<{ list: IBook[] }>()
);
export const loadBookFail = createAction(
  BookActionsType.LOAD_BOOK_FAIL,
  props<{ errorMessage: string }>()
);

//add

export const addBook = createAction(
  BookActionsType.ADD_BOOK,
  props<{ inputData: IBook }>()
);
export const addBookSuccess = createAction(
  BookActionsType.ADD_BOOK_SUCCESS,
  props<{ inputData: IBook }>()
);

//update
export const updateBook = createAction(
  BookActionsType.UPDATE_BOOK,
  props<{ inputData: IBook }>()
);

export const updateBookSuccess = createAction(
  BookActionsType.UPDATE_BOOK_SUCCESS,
  props<{ inputData: Update<IBook> }>()
);

export const deleteBook = createAction(
  BookActionsType.DELETE_BOOK,
  props<{ code: number }>()
);
export const deleteBookSuccess = createAction(
  BookActionsType.DELETE_BOOK_SUCCESS,
  props<{ code: number }>()
);

//get by
export const getBook = createAction(
  BookActionsType.GET_BOOK,
  props<{ id: number }>()
);
export const getBookSuccess = createAction(
  BookActionsType.GET_BOOK_SUCCESS,
  props<{ obj: IBook }>()
);

//popup
export const openPopup = createAction(BookActionsType.OPEN_POPUP);
