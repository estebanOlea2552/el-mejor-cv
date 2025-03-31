import { createAction, props } from "@ngrx/store";

export const selectTemplateLang = createAction(
    '[Template Language Selector] Select Language',
    props<{ lang: string }>()
)