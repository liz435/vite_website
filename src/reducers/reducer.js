import { SHOW_CONTENT, HIDE_CONTENT } from '../actions';

const initialState = {
  isVisible: false,
};

function contentReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CONTENT:
      return { ...state, isVisible: true };
    case HIDE_CONTENT:
      return { ...state, isVisible: false };
    default:
      return state;
  }
}

export default contentReducer;
