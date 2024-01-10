import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes.tsx';
// import { AuthProvider } from './contexts/AuthContext.tsx';
import { TitleProvider } from './contexts/TitleContext.tsx';

const App = () => {
  return (
    // <AuthProvider>
    <TitleProvider>
      <RouterProvider router={router} />
    </TitleProvider>
    // </AuthProvider>
  );
};

export default App;
