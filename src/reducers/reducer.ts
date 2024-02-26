import { createAction, createReducer } from '@reduxjs/toolkit';
import ITask from '../@types/task';
import {
  actionAddTask,
  actionDeleteTask,
  actionEditTask,
  actionLoadTasks,
} from '../middlewares/apiTasks';

interface IState {
  tasks: ITask[];
}

const initialState: IState = {
  tasks: [],
};

export const setTasks = createAction('SET_TASKS');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionLoadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(actionAddTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(actionEditTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (tasks) => tasks.id === action.payload.id
      );
      state.tasks[index] = action.payload;
    })
    .addCase(actionDeleteTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
});

export default reducer;
