import { createAction, props } from '@ngrx/store';
import { IAssociates } from '../../model/associates';
import { AssociateActionsType } from './associate.types';
import { Update } from '@ngrx/entity';

//load
export const loadAssociate = createAction(AssociateActionsType.LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(
  AssociateActionsType.LOAD_ASSOCIATE_SUCCESS,
  props<{ list: IAssociates[] }>()
);
export const loadAssociateFail = createAction(
  AssociateActionsType.LOAD_ASSOCIATE_FAIL,
  props<{ errorMessage: string }>()
);

//add

export const addAssociate = createAction(
  AssociateActionsType.ADD_ASSOCIATE,
  props<{ inputData: IAssociates }>()
);
export const addAssociateSuccess = createAction(
  AssociateActionsType.ADD_ASSOCIATE_SUCCESS,
  props<{ inputData: IAssociates }>()
);

//update
export const updateAssociate = createAction(
  AssociateActionsType.UPDATE_ASSOCIATE,
  props<{ inputData: IAssociates }>()
);

export const updateAssociateSuccess = createAction(
  AssociateActionsType.UPDATE_ASSOCIATE_SUCCESS,
  props<{ inputData:Update< IAssociates> }>()
);

export const deleteAssociate = createAction(
  AssociateActionsType.DELETE_ASSOCIATE,
  props<{ code: number }>()
);
export const deleteAssociateSuccess = createAction(
  AssociateActionsType.DELETE_ASSOCIATE_SUCCESS,
  props<{ code: number }>()
);

//get by
export const getAssociate = createAction(
  AssociateActionsType.GET_ASSOCIATE,
  props<{ id: number }>()
);
export const getAssociateSuccess = createAction(
  AssociateActionsType.GET_ASSOCIATE_SUCCESS,
  props<{ obj: IAssociates }>()
);


//popup
export const openPopup = createAction(AssociateActionsType.OPEN_POPUP);
