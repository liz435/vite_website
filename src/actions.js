// Action Types
export const SET_CONTENT = 'SET_CONTENT';
export const HIDE_CONTENT = 'HIDE_CONTENT';
export const SHOW_CONTENT = 'SHOW_CONTENT';

// Action Creators
export const setContent = content => ({
  type: SET_CONTENT,
  payload: content,
});

export const showContent = () => ({
  type: SHOW_CONTENT,
});

export const hideContent = () => ({
  type: HIDE_CONTENT,
});


export const selectSphere = (sphereDetails) => ({
  type: 'SELECT_SPHERE',
  payload: sphereDetails,
});
