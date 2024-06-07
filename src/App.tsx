import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { TitleProvider } from './contexts/TitleContext.tsx';
import { KeypadProvider } from './contexts/KeypadContext.tsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <AuthProvider>
      <TitleProvider>
        <KeypadProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </KeypadProvider>
      </TitleProvider>
    </AuthProvider>
  );
};

export default App;
