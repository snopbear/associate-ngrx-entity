import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAssociateModel } from '../../model/associates';
import { associateAdapter } from './associate.state';
import { state } from '@angular/animations';

const getAssociateState = createFeatureSelector<IAssociateModel>('associate');

const associateSelector = associateAdapter.getSelectors();
export const getAssociateList = createSelector(
  getAssociateState,
  associateSelector.selectAll
);

const selectedEntities = createSelector(
  getAssociateState,
  associateSelector.selectEntities
);
export const getAssociate = (id: number) =>
  createSelector(selectedEntities, (state) => state[id]);

export const getErrorMessage = createSelector(
  getAssociateState,
  (state) => state.errorMessage
);

// export const getAssociateList = createSelector(getAssociateState, (state) => {

//   return state.list;
// });

// export const getAssociate = createSelector(getAssociateState, (state) => {
//   return state.associateObj;)
// });
