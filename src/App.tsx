import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { KeypadProvider } from './contexts/KeypadContext.tsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <KeypadProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </KeypadProvider>
    </AuthProvider>
  );
};

export default App;
