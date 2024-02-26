import React, { createContext } from 'react';
import { IState } from './initialState';
import { ITasksAction } from './actions';

// on prépare le type des valeurs qui seront contenues dans notre contexte
// il contiendra le state et le dispatch qui nous seront fournis par useReducer
interface ITaskContext {
  state: IState;
  dispatch: React.Dispatch<ITasksAction>;
}

// Lorsqu'on créé le context, on doit lui passer une valeur par défaut.
// Dans le cas où aucun context provider ne serait défini, elle serait utilisée.
// Techniquement, les données par défaut ne seront jamais utilisées car on va toujours définir un context provider donc on met ici undefined en valeur par défaut.
const TasksContext = createContext<ITaskContext | undefined>(undefined);
export default TasksContext;
