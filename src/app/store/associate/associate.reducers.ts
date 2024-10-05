import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './associate.state';
import * as associateAction from './associate.actions';

const _AssociateReducer = createReducer(
  AssociateState,

  on(associateAction.loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(associateAction.loadAssociateFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(associateAction.addAssociateSuccess, (state, action) => {
    const maxId = Math.max(...state.list.map((o) => o.id));
    const newData = { ...action.inputData };
    newData.id = maxId + 1;
    return {
      ...state,
      list: [...state.list, newData],
      errorMessage: '',
    };
  }),

  on(associateAction.getAssociateSuccess, (state, action) => {
    return {
      ...state,
      associateObj: action.obj,
      errorMessage: '',
    };
  }),
  on(associateAction.updateAssociateSuccess, (state, action) => {
    const newData = state.list.map((o) => {
      return o.id === action.inputData.id ? action.inputData : o;
    });
    return {
      ...state,
      list: newData,
      errorMessage: '',
    };
  }),
  on(associateAction.deleteAssociateSuccess, (state, action) => {
    const newData = state.list.filter((o) => o.id !== action.code);

    return {
      ...state,
      list: newData,
      errorMessage: '',
    };
  }),
  on(associateAction.openPopup, (state, action) => {
    return {
      ...state,
      associateObj: {
        id: 0,
        name: '',
        email: '',
        phone: '',
        type: 'CUSTOMER',
        address: '',
        associateGroup: 'level1',
        status: true,
      },
    };
  })
);

export function AssociateReducer(state: any, actions: any) {
  return _AssociateReducer(state, actions);
}
