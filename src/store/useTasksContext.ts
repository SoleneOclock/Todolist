import { useContext } from 'react';
import TasksContext from './context';

// on prépare un customHook useTaskContext à utiliser dans nos composants
// pour ne pas etre obligé d'importer le hook useContext + le TaskContext dans chaque composant qui veut l'utiliser
// et pour vérifier qu'il y a bien eu un context provider qui a partagé des valeurs
const useTaskContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default useTaskContext;
