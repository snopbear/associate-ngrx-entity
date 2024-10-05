import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as associateAction from './associate.actions';
import { catchError, exhaustMap, of, map, switchMap, concatMap, mergeMap } from 'rxjs';
import { AssociateService } from '../../service/associate.service';
import { showAlert } from '../../common/app.actions';

@Injectable()
export class AssociateEffects {
  private service = inject(AssociateService);
  private action$ = inject(Actions);

  loadAssociate$ = createEffect(() =>
    this.action$.pipe(
      ofType(associateAction.loadAssociate),
      exhaustMap((action) => {
        return this.service.getAll().pipe(
          map((data) => {
            return associateAction.loadAssociateSuccess({ list: data });
          }),
          catchError((_error) =>
            of(
              associateAction.loadAssociateFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  getAssociate$ = createEffect(() =>
    this.action$.pipe(
      ofType(associateAction.getAssociate),
      switchMap((action) => {
        return this.service.getByCode(action.id).pipe(
          map((data) => {
            return associateAction.getAssociateSuccess({ obj: data });
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

  addAssociate$ = createEffect(() =>
    this.action$.pipe(
      ofType(associateAction.addAssociate),
      concatMap((action) => {
        return this.service.create(action.inputData).pipe(
          switchMap((data) => {
            return of(
              associateAction.addAssociateSuccess({
                inputData: action.inputData,
              }),
              showAlert({
                message: 'Associate added successfully',
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

  editAssociate$ = createEffect(() =>
    this.action$.pipe(
      ofType(associateAction.updateAssociate),
      switchMap((action) => {
        return this.service.update(action.inputData).pipe(
          concatMap((data) => {
            return of(
              associateAction.updateAssociateSuccess({
                inputData: action.inputData,
              }),

              showAlert({
                message: 'Associate updated successfully',
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

  deleteAssociate$ = createEffect(() =>
    this.action$.pipe(
      ofType(associateAction.deleteAssociate),
      switchMap((action) => {
        return this.service.delete(action.code).pipe(
          mergeMap((data) => {
            return of(
              associateAction.deleteAssociateSuccess({
                code: action.code,
              }),

              showAlert({
                message: 'Associate Delete successfully',
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
