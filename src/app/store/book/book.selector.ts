import { createFeatureSelector, createSelector } from '@ngrx/store';

import { state } from '@angular/animations';
import { IBookModel } from './book';
import { bookAdapter } from './book.state';

const getBookState = createFeatureSelector<IBookModel>('associate');

const bookSelector = bookAdapter.getSelectors();
export const getBookList = createSelector(getBookState, bookSelector.selectAll);

const selectedEntities = createSelector(
  getBookState,
  bookSelector.selectEntities
);
export const getBook = (id: number) =>
  createSelector(selectedEntities, (state) => state[id]);

export const getErrorMessage = createSelector(
  getBookState,
  (state) => state.errorMessage
);
