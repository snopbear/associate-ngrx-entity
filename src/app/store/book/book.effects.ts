import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookAction from './book.actions';
import { catchError, exhaustMap, of, map, switchMap, concatMap, mergeMap } from 'rxjs';
import { showAlert } from '../../common/app.actions';
import { Update } from '@ngrx/entity';
import { IBook } from './book';
import { BookService } from '../../service/book/book.service';


@Injectable()
export class BookEffects {
  private service = inject(BookService);
  private action$ = inject(Actions);

  loadBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookAction.loadBook),
      exhaustMap((action) => {
        return this.service.getAll().pipe(
          map((data) => {
            return bookAction.loadBookSuccess({ list: data });
          }),
          catchError((_error) =>
            of(
              bookAction.loadBookFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  getBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookAction.getBook),
      switchMap((action) => {
        return this.service.getByCode(action.id).pipe(
          map((data) => {
            return bookAction.getBookSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to create a associate' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  addBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookAction.addBook),
      concatMap((action) => {
        return this.service.create(action.inputData).pipe(
          concatMap((data) => {
            return of(
              bookAction.addBookSuccess({
                inputData: action.inputData,
              }),
              showAlert({
                message: 'Book added successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to create a associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  editBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookAction.updateBook),
      concatMap((action) => {
        return this.service.update(action.inputData).pipe(
          concatMap((data) => {
            const updatedRecord: Update<IBook> = {
              id: action.inputData.id,
              changes: action.inputData,
            };
            return of(
              bookAction.updateBookSuccess({
                inputData: updatedRecord,
              }),
              showAlert({
                message: 'UpDated successfully.',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to update CUSTOMER',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  deleteBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookAction.deleteBook),
      mergeMap((action) => {
        return this.service.delete(action.code).pipe(
          mergeMap((data) => {
            return of(
              bookAction.deleteBookSuccess({
                code: action.code,
              }),

              showAlert({
                message: 'Book Delete successfully',
                resultType: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to delete a associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
