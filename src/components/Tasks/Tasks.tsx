import ITask from '../../@types/task';
import Task from '../Task/Task';

interface TasksProps {
  tasks: ITask[];
}

function Tasks({ tasks }: TasksProps) {
  return (
    <ul className="list">
      {tasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </ul>
  );
}

export default Tasks;
