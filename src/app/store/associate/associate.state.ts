import { createEntityAdapter } from "@ngrx/entity";
import { IAssociateModel, IAssociates } from "../../model/associates";

export const associateAdapter=createEntityAdapter<IAssociates>(
    {
        selectId: (associate: IAssociates) => associate.id,
        sortComparer: (a: IAssociates, b: IAssociates) => a.name.localeCompare(b.name)
    }
);
export const AssociateState: IAssociateModel = associateAdapter.getInitialState({
    errorMessage: "",
    isLoading: false
});
