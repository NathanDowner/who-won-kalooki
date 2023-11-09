import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store.ts';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ReduxProvider>,
);
