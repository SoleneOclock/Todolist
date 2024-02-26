import { useAppSelector } from '../../hooks/redux';
import './Counter.scss';

function Counter() {
  const notDoneTasks = useAppSelector(
    (state) => state.tasks.filter((task) => !task.done).length
  );

  return <p className="counter">{notDoneTasks} tâches en cours</p>;
}

export default Counter;
