import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { TitleProvider } from './contexts/TitleContext.tsx';
import { KeypadProvider } from './contexts/KeypadContext.tsx';

const App = () => {
  return (
    <AuthProvider>
      <TitleProvider>
        <KeypadProvider>
          <RouterProvider router={router} />
        </KeypadProvider>
      </TitleProvider>
    </AuthProvider>
  );
};

export default App;
