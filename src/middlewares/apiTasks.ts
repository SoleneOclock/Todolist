import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ITask from '../@types/task';

export const actionLoadTasks = createAsyncThunk<ITask[]>(
  'LOAD_TASKS',
  async () => {
    const result = await axios.get('http://localhost:3000/tasks');
    return result.data;
  }
);

export const actionAddTask = createAsyncThunk<ITask[], string>(
  'ADD_TASK',
  async (inputValue) => {
    const result = await axios.post('http://localhost:3000/tasks', {
      label: inputValue,
      done: false,
    });
    return result.data;
  }
);

export const actionEditTask = createAsyncThunk<ITask, ITask>(
  'EDIT_TASK',
  async (taskToUpdate) => {
    const result = await axios.put(
      `http://localhost:3000/tasks/${taskToUpdate.id}`,
      taskToUpdate
    );
    return result.data;
  }
);

export const actionDeleteTask = createAsyncThunk<ITask[], number>(
  'DELETE_TASK',
  async (taskId) => {
    const result = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    return result.data;
  }
);
