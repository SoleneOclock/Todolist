import { useEffect, useRef, useState } from 'react';
import './Form.scss';

interface FormProps {
  addTask: (inputValue: string) => Promise<void>;
}

function Form({ addTask }: FormProps) {
  const [inputValue, setInputValue] = useState('');

  // on créé une ref (c'est une boite vide car initialisée à null)
  // après le premier rendu React va remplir la ref avec notre input
  // et après ça la valeur ne sera pas réinitialisée à chaque render
  const myInputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    // console.log(document.querySelector('.form-item'));
    // on ne va pas faire de querySelector en React
    // const inputElem = document.querySelector('.form-item') as HTMLElement;

    // on a créé une ref, on l'a branché avec un element JSX
    // dès que le DOM sera réconcilié React va remplir la ref avec l'element du DOM (le node)
    // il place le node dans un objet en value d'une propriété "current"
    const inputElem = myInputRef.current as HTMLInputElement;
    inputElem.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        addTask(inputValue);
        setInputValue('');
      }}
    >
      <input
        // on branche notre ref avec un element JSX
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
