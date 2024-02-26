import ITask from '../@types/task';

export interface IState {
  tasks: ITask[];
}

export const initialState: IState = {
  tasks: [{ id: 1, done: false, label: 'toto' }],
};
