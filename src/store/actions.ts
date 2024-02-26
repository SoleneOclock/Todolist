import ITask from '../@types/task';

export type ITasksAction =
  | {
      type: 'SET_TASKS';
      payload: ITask[];
    }
  | {
      type: 'EDIT_TASK';
      payload: ITask;
    };

export const actionSetTasks = (taskList: ITask[]) => {
  return {
    type: 'SET_TASKS',
    payload: taskList,
  } as const;
};

export const actionEditTask = (taskToEdit: ITask) => {
  return {
    type: 'EDIT_TASK',
    payload: taskToEdit,
  } as const;
};
