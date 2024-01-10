import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store/store.ts';
import { Provider as ReduxProvider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
);
