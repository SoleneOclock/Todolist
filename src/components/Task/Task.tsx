import { useState } from 'react';
import { Trash, Edit, Check } from 'react-feather';
import './Task.scss';
import ITask from '../../@types/task';
import { actionDeleteTask, actionEditTask } from '../../middlewares/apiTasks';
import { useAppDispatch } from '../../hooks/redux';

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const { id, label, done } = task;

  const [isEditing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const dispatch = useAppDispatch();

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
            // au check on demande à ce que la tache soit modifiée coté back puis dans le state
            dispatch(actionEditTask({ ...task, done: !done }));
          }}
        />
        {!isEditing ? (
          <span>{label}</span>
        ) : (
          <form
            className="item-form"
            onSubmit={(event) => {
              event.preventDefault();
              // au submit on demande à ce que la tache soit modifiée coté back puis dans le state
              dispatch(actionEditTask({ ...task, label: editedLabel }));
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
          // au click on demande à ce que la tache soit supprimée coté back puis dans le state
          dispatch(actionDeleteTask(id));
        }}
      >
        <Trash size={20} />
      </button>
    </li>
  );
}

export default Task;
