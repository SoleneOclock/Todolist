import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './styles/index.scss';
import TasksProvider from './store/contextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TasksProvider>
    <App />
  </TasksProvider>
);
