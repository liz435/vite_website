import { createStore, combineReducers } from 'redux';
import contentReducer from './reducers/reducer';

const rootReducer = combineReducers({
  content: contentReducer,
});

const store = createStore(rootReducer);

export default store;
