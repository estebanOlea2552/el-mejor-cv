import { ActionReducerMap } from "@ngrx/store";
import { templateReducer } from "./reducers/template.reducer";
import { SelectedTemplateState } from "../model/select-temp-state.model";

export interface AppState {
    selectedTemplate: SelectedTemplateState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    selectedTemplate: templateReducer
};