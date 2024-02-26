import { useEffect, useState } from 'react';
import axios from 'axios';
import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import Tasks from '../Tasks/Tasks';
import './App.scss';
import ITask from '../../@types/task';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const notDoneTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  const loadTasksFromBack = async () => {
    const result = await axios.get('http://localhost:3000/tasks');
    setTasks(result.data);
  };

  const addTaskToBackAndState = async (inputValue: string) => {
    const result = await axios.post('http://localhost:3000/tasks', {
      label: inputValue,
      done: false,
    });
    setTasks([...result.data]);
  };

  const updateTaskDoneOnBackAndState = async (taskToUpdate: ITask) => {
    const result = await axios.put(
      `http://localhost:3000/tasks/${taskToUpdate.id}`,
      taskToUpdate
    );
    const modifiedTask = result.data;
    const updatedTasks = tasks.map((task) =>
      task.id === taskToUpdate.id ? modifiedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTaskDoneOnBackAndState = async (taskId: number) => {
    const result = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    setTasks([...result.data]);
  };

  useEffect(() => {
    loadTasksFromBack();
  }, []);

  return (
    <div className="App">
      <Form addTask={addTaskToBackAndState} />
      <Counter nb={notDoneTasks.length} />
      <Tasks
        tasks={notDoneTasks}
        updateTask={updateTaskDoneOnBackAndState}
        deleteTask={deleteTaskDoneOnBackAndState}
      />
      <Tasks
        tasks={doneTasks}
        updateTask={updateTaskDoneOnBackAndState}
        deleteTask={deleteTaskDoneOnBackAndState}
      />
    </div>
  );
}

export default App;
