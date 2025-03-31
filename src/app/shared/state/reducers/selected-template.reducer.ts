import { createReducer, on } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/shared/state/app.state"
import { notifyOverflow, selectTemplate, selectTemplateTheme } from "../actions/selected-template.action";

const initialState: SelectedTemplateState = {
    id: "",
    templateName: "",
    theme: "",
    hasOverflow: false
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
    }), 
    on(notifyOverflow, (state, { hasOverflow }) => {
        return {
            ...state,
            hasOverflow: hasOverflow
        }
    })
)