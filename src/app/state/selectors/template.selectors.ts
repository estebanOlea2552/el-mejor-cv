import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SelectedTemplateState } from "src/app/model/select-temp-state.model";

//TODO: Arreglar el tipo del parámetro "state". Tiene que ser de tipo AppState
export const selectSelectedTemplate = (state: any) => state.selectedTemplate

export const templateSelector = createSelector(
    selectSelectedTemplate,
    (selectedTemplate: SelectedTemplateState) => selectedTemplate.id
);