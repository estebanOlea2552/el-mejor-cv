import { createSelector } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/model/state-model/selected-template-state";

//TODO: Arreglar el tipo del parámetro "state". Tiene que ser de tipo AppState
export const templateDataFromStore = (state: any) => state.selectedTemplate

export const templateSelector = createSelector(
    templateDataFromStore,
    (selectedTemplate: SelectedTemplateState) => selectedTemplate.id
);

export const themeSelector = createSelector(
    templateDataFromStore,
    (selectedTemplate: SelectedTemplateState) => selectedTemplate.theme
)

export const overflowNotifySelector = createSelector(
    templateDataFromStore,
    (selectedTemplate: SelectedTemplateState) => selectedTemplate.hasOverflow
)