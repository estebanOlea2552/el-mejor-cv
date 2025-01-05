import { ActionReducerMap } from "@ngrx/store";
import { selectedTemplateReducer } from "./reducers/selected-template.reducer";
import { SelectedTemplateState } from "../model/state-model/selected-template-state";

export interface AppState {
    selectedTemplate: SelectedTemplateState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    selectedTemplate: selectedTemplateReducer,
};