const initialState = {
    url: '',
    title: '',
    scale: null,
    modelPath: '',
    rotation: null,
    callback: '',
    isSelected: false, // You might want to track if a sphere is selected
  };
  
  export default function selectedSphereReducer(state = initialState, action) {
    switch (action.type) {
      case 'SELECT_SPHERE':
        return {
          ...state,
          ...action.payload,
          isSelected: true,
        };
      case 'DESELECT_SPHERE':
        return initialState; // Reset to initial state
      default:
        return state;
    }
  }
  