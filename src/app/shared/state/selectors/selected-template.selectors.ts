import { createSelector } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/shared/state/app.state"

//TODO: Fix the type of the parameter "state". It must be "AppState"
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