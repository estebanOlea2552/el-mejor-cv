import { createAction, props } from "@ngrx/store";
import { Template } from "src/app/model/template.model";

export const selectTemplate = createAction(
    '[Template Selector] Select Template',
    props<{ template: Template }>()
)