import { createAction, props } from "@ngrx/store";
import { SelectedTemplateState } from "src/app/model/state-model/selected-template-state";

export const selectTemplate = createAction(
    '[Template Selector] Select Template',
    props<{ template: SelectedTemplateState }>()
)

export const selectTemplateTheme = createAction(
    '[Template Theme Selector] Select Template Theme',
    props<{ theme: string}>()
)