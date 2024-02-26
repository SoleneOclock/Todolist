import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Form.scss';
import useTaskContext from '../../store/useTasksContext';
import { actionSetTasks } from '../../store/actions';

function Form() {
  const [inputValue, setInputValue] = useState('');

  const { state, dispatch } = useTaskContext();

  const addTask = async () => {
    const result = await axios.post('http://localhost:3000/tasks', {
      label: inputValue,
      done: false,
    });
    // le call api nous renvoie toutes les taches, on remet à jour coté state
    dispatch(actionSetTasks(result.data));
  };

  const myInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    const inputElem = myInputRef.current as HTMLInputElement;
    inputElem.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        addTask();
        setInputValue('');
      }}
    >
      <input
        ref={myInputRef}
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
    </form>
  );
}

export default Form;
