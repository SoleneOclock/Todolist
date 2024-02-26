import { ReactNode, useMemo, useReducer } from 'react';
import tasksReducer from './reducer';
import TasksContext from './context';
import { initialState } from './initialState';

interface ProviderProps {
  children: ReactNode;
}

// Une fois le context créer, il faut créer un Provider
// Provider === fournisseur de données
// C'est un composant qui va stocker les données et utiliser le context pour les rendre accessible à tous les composants enfants
// TasksProvider aura le rôle d'englober les autres composants de mon application
// A l'intérieur il s'occupera de stocker les données à fournir à mes composants enfants
// children est une propriété particulière faisant référence aux composants enfants mis entre les balises de mon composant
function TasksProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // on prépare les données à "provider" : le state + la fonction dispatch
  // const valueToProvide = { state, dispatch };
  // A chaque exécution du composant TasksProvider, on va créer un nouvel objet avec une nouvelle adresse en mémoire. Pour éviter de créer un nouvel objet inutillement, on va utiliser le hook useMemo
  // 1er paramètre : la fonction qui retournera la valeur
  // 2ème paramètre : un tableau de dépendances qui permettra de recalculer la valeur si une des dépendances change
  const valueToProvide = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TasksContext.Provider value={valueToProvide}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
