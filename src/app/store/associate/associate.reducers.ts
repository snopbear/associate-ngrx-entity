import { createReducer, on } from '@ngrx/store';
import { associateAdapter, AssociateState } from './associate.state';
import * as associateAction from './associate.actions';

const _AssociateReducer = createReducer(
  AssociateState,

  on(associateAction.loadAssociateSuccess, (state, action) => {
    return associateAdapter.setAll(action.list, {
      ...state,
      errorMessage: '',
    });
  }),

  on(associateAction.loadAssociateFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),

  on(associateAction.addAssociateSuccess, (state, action) => {
    // only used with json server
    const maxId = Math.max(...state.ids.map((id) => id as number));
    const newData = { ...action.inputData };
    newData.id = maxId + 1;

    // return associateAdapter.addOne(action.inputData, state);

    // only used with json server
    return associateAdapter.addOne(newData, state);
  }),
  on(associateAction.updateAssociateSuccess, (state, action) => {
    return associateAdapter.updateOne(action.inputData, state);
  }),
  on(associateAction.deleteAssociateSuccess, (state, action) => {
    return associateAdapter.removeOne(action.code, state);
  })
);

export function AssociateReducer(state: any, actions: any) {
  return _AssociateReducer(state, actions);
}
