import { createSelector } from "@ngrx/store";
import { AppState, TemplateLangState } from "src/app/shared/state/app.state"

export const templateLangFromStore = (state: AppState) => state.selectedLang;

export const templateLangSelector = createSelector(
    templateLangFromStore,
    (selectedLang: TemplateLangState) => selectedLang.selectedLanguage
)