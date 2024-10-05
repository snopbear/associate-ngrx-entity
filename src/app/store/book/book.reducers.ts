import { createReducer, on } from '@ngrx/store';
import * as bookAction from './book.actions';
import { bookAdapter, BookState } from './book.state';

const _bookReducer = createReducer(
  BookState,
  on(bookAction.loadBookSuccess, (state, action) => {
    return bookAdapter.setAll(action.list, {
      ...state,
      errorMessage: '',
    });
  }),

  on(bookAction.loadBookFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),

  on(bookAction.addBookSuccess, (state, action) => {
    // only used with json server
    const maxId = Math.max(...state.ids.map((id) => id as number));
    const newData = { ...action.inputData };
    newData.id = maxId + 1;

    // return associateAdapter.addOne(action.inputData, state);

    // only used with json server
    return bookAdapter.addOne(newData, state);
  }),
  on(bookAction.updateBookSuccess, (state, action) => {
    return bookAdapter.updateOne(action.inputData, state);
  }),
  on(bookAction.deleteBookSuccess, (state, action) => {
    return bookAdapter.removeOne(action.code, state);
  })
);

export function bookReducer(state: any, actions: any) {
  return _bookReducer(state, actions);
}
