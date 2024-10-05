import { createReducer, on } from '@ngrx/store';
import { associateAdapter, AssociateState } from './associate.state';
import * as associateAction from './associate.actions';

const _AssociateReducer = createReducer(
  AssociateState,

  on(associateAction.loadAssociateSuccess, (state, action) => {
    // return {
    //   ...state,
    //   list: action.list,
    //   errorMessage: '',
    // };

    // if there is no fileds in the model
    // return associateAdapter.setAll(action.list, state);
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

    // return {
    //   ...state,
    //   list: [...state.list, newData],
    //   errorMessage: '',
    // };

    // return associateAdapter.addOne(action.inputData, state);

    // only used with json server
    return associateAdapter.addOne(newData, state);
  }),
  on(associateAction.updateAssociateSuccess, (state, action) => {
    // const newData = state.list.map((o) => {
    //   return o.id === action.inputData.id ? action.inputData : o;
    // });
    // return {
    //   ...state,
    //   list: newData,
    //   errorMessage: '',
    // };
    return associateAdapter.updateOne(action.inputData, state);
  }),
  on(associateAction.deleteAssociateSuccess, (state, action) => {
    // const newData = state.list.filter((o) => o.id !== action.code);

    // return {
    //   ...state,
    //   list: newData,
    //   errorMessage: '',
    // };
    return associateAdapter.removeOne(action.code, state);
  })
  //   on(associateAction.openPopup, (state, action) => {
  //     return {
  //       ...state,
  //       associateObj: {
  //         id: 0,
  //         name: '',
  //         email: '',
  //         phone: '',
  //         type: 'CUSTOMER',
  //         address: '',
  //         associateGroup: 'level1',
  //         status: true,
  //       },
  //     };
  //   })

  //   on(associateAction.getAssociateSuccess, (state, action) => {
  //     return {
  //       ...state,
  //       associateObj: action.obj,
  //       errorMessage: '',
  //     };
  //   }),
);

export function AssociateReducer(state: any, actions: any) {
  return _AssociateReducer(state, actions);
}
