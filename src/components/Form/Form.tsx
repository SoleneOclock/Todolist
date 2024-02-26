import { useEffect, useRef, useState } from 'react';
import './Form.scss';
import { useAppDispatch } from '../../hooks/redux';
import { actionAddTask } from '../../middlewares/apiTasks';

function Form() {
  const [inputValue, setInputValue] = useState('');

  const myInputRef = useRef<null | HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const inputElem = myInputRef.current as HTMLInputElement;
    inputElem.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        // au submit du form, on demande à ce que la nouvelle tache soit ajoutée coté back puis dans le state
        dispatch(actionAddTask(inputValue));
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
