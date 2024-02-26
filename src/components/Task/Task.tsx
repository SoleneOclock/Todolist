import { useState } from 'react';
import { Trash, Edit, Check } from 'react-feather';
import axios from 'axios';
import './Task.scss';
import ITask from '../../@types/task';
import useTaskContext from '../../store/useTasksContext';
import { actionEditTask, actionSetTasks } from '../../store/actions';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const { id, label, done } = task;

  const [isEditing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const { state, dispatch } = useTaskContext();

  const editTask = async (updatedTask: ITask) => {
    const result = await axios.put(
      `http://localhost:3000/tasks/${task.id}`,
      updatedTask
    );
    dispatch(actionEditTask(result.data));
  };

  const deleteTask = async () => {
    const result = await axios.delete(`http://localhost:3000/tasks/${task.id}`);
    dispatch(actionSetTasks(result.data));
  };

  return (
    <li key={id} className="item">
      <label
        className={done ? 'item-label item-label--done' : 'item-label'}
        htmlFor={`task-${id}`}
      >
        <input
          className="item-checkbox"
          type="checkbox"
          defaultChecked={done}
          id={`task-${id}`}
          onChange={() => {
            editTask({ ...task, done: !done });
          }}
        />
        {!isEditing ? (
          <span>{label}</span>
        ) : (
          <form
            className="item-form"
            onSubmit={(event) => {
              event.preventDefault();
              editTask({ ...task, label: editedLabel });
              setEditing(false);
            }}
          >
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => {
                setEditedLabel(e.target.value);
              }}
            />
            <button type="submit" className="item-delete">
              <Check size={20} />
            </button>
          </form>
        )}
      </label>
      <button
        type="button"
        className="item-delete"
        onClick={() => {
          setEditing(true);
        }}
      >
        <Edit size={20} />
      </button>
      <button
        type="button"
        className="item-delete"
        onClick={() => {
          deleteTask();
        }}
      >
        <Trash size={20} />
      </button>
    </li>
  );
}

export default Task;
