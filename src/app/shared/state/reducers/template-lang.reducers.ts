import { createReducer, on } from '@ngrx/store';
import { TemplateLangState } from '../app.state';
import { selectTemplateLang } from '../actions/template-lang.action';

const initialState: TemplateLangState = {
  selectedLanguage: 'spanish'
};

export const templateLangReducer = createReducer(
  initialState,
  on(selectTemplateLang, (state, { lang }) => {
    return {
      ...state,
      selectedLanguage: lang
    };
  })
);
