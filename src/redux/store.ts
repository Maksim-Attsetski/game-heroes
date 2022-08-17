import { combineReducers, createStore } from 'redux';
import { heroesReducer } from './reducers/heroesReducer';
import { taskReducer } from './reducers/taskReducer';
import { themeReducer } from './reducers/themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: taskReducer,
  heroes: heroesReducer,
});

export const store = createStore(rootReducer);

export type typeReducer = ReturnType<typeof rootReducer>;
type typeStore = typeof store;
export type typeDispatch = typeStore['dispatch'];
