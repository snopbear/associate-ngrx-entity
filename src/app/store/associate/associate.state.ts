import { IAssociateModel } from "../../model/associates";

export const AssociateState:IAssociateModel={
    list: [],
    errorMessage: '',
    associateObj: {
      id: 0,
      name: '',
      email: '',
      phone: '',
      type: 'CUSTOMER',
      address: '',
      associateGroup: 'level1',
      status: true
    }
}