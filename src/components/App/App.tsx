import { useEffect } from 'react';
import axios from 'axios';

import useTaskContext from '../../store/useTasksContext';
import { actionSetTasks } from '../../store/actions';

import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import Tasks from '../Tasks/Tasks';
import './App.scss';

function App() {
  const { state, dispatch } = useTaskContext();

  const notDoneTasks = state.tasks.filter((task) => !task.done);
  const doneTasks = state.tasks.filter((task) => task.done);

  const loadTasks = async () => {
    const result = await axios.get('http://localhost:3000/tasks');
    dispatch(actionSetTasks(result.data));
  };

  useEffect(
    () => {
      loadTasks();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="App">
      <Form />
      <Counter />
      <Tasks tasks={notDoneTasks} />
      <Tasks tasks={doneTasks} />
    </div>
  );
}

export default App;
