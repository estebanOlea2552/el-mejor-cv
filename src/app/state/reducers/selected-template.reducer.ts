import { createReducer, on } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/model/state-model/selected-template-state";
import { selectTemplate, selectTemplateTheme } from "../actions/selected-template.action";

const initialState: SelectedTemplateState = {
    id: "",
    templateName: "",
    theme: ""
}

export const selectedTemplateReducer = createReducer(
    initialState,
    // state refers to the current state of SelectedTemplateState
    on(selectTemplate, (state, { template }) => {
        return {
            ...state,
            ...template
        }
    }),
    on(selectTemplateTheme, (state, { theme }) => {
        return {
            ...state,
            theme: theme
        }
    })
)