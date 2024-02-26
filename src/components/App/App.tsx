import { useEffect } from 'react';
import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import Tasks from '../Tasks/Tasks';
import './App.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { actionLoadTasks } from '../../middlewares/apiTasks';

function App() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);

  const notDoneTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  useEffect(
    () => {
      // au premier chargement du composant on demande le chargement des données
      dispatch(actionLoadTasks());
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
