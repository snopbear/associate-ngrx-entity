import { createEntityAdapter } from "@ngrx/entity";
import { IAssociateModel, IAssociates } from "../../model/associates";

export const associateAdapter=createEntityAdapter<IAssociates>();
export const AssociateState: IAssociateModel = associateAdapter.getInitialState({
    errorMessage: "",
    isLoading: false
});


// *********Remove for using associationAdapter*******************

// export const AssociateState:IAssociateModel={
//     list: [],
//     errorMessage: '',
//     associateObj: {
//       id: 0,
//       name: '',
//       email: '',
//       phone: '',
//       type: 'CUSTOMER',
//       address: '',
//       associateGroup: 'level1',
//       status: true
//     }
// }