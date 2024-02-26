import { ITasksAction } from './actions';
import { IState } from './initialState';

// notre reducer est une fonction qui va recevoir le state + une action
// et renvoyer un nouveau state
// on va le donner à notre useReducer
const tasksReducer = (state: IState, action: ITasksAction) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };

    default:
      return state;
  }
};

export default tasksReducer;
