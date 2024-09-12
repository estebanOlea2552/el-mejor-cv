import { createReducer, on } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/model/select-temp-state.model";
import { selectTemplate } from "../actions/template.action";

const initialState: SelectedTemplateState = { 
    id: "",
    templateName: "",
    component: "" 
} 

export const templateReducer = createReducer(
    initialState,
    on(selectTemplate, (state, { template }) => {
        return {
            ...state,
            ...template
        }
    })
)