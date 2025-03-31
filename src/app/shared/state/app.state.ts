import { ActionReducerMap } from "@ngrx/store";
import { selectedTemplateReducer } from "./reducers/selected-template.reducer";
import { templateLangReducer } from "./reducers/template-lang.reducers";

export interface SelectedTemplateState {
    id: string,
    templateName: string,
    theme: string,
    hasOverflow: boolean
}

export interface TemplateLangState {
    selectedLanguage: string;
}

export interface AppState {
    selectedTemplate: SelectedTemplateState;
    selectedLang: TemplateLangState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    selectedTemplate: selectedTemplateReducer,
    selectedLang: templateLangReducer
};