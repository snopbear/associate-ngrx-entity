import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAssociateModel } from '../../model/associates';

const getAssociateState = createFeatureSelector<IAssociateModel>('associate');

export const getAssociateList = createSelector(getAssociateState, (state) => {

  return state.list;
});

export const getAssociate = createSelector(getAssociateState, (state) => {
  return state.associateObj;
});
