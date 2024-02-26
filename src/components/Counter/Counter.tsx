import useTaskContext from '../../store/useTasksContext';
import './Counter.scss';

function Counter() {
  const { state } = useTaskContext();
  const notDoneTasks = state.tasks.filter((task) => !task.done).length;

  return <p className="counter">{notDoneTasks} tâches en cours</p>;
}

export default Counter;
