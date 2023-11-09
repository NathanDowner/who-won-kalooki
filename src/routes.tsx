import { Navigate, createBrowserRouter } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import DefaultLayout from './layouts/DefaultLayout';

export const AppRoutes = {
  root: '/',
  guestListBuilder: (listId: string) => `/lists/${listId}`,
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <Navigate to="/lists" /> },
      {
        path: 'lists/',
        element: <AuthGuard />,
        children: [
          { path: ':listId', element: <div>List</div> },
        ],
      },
      { path: '*', element: <div>Not Found</div> },
    ],
  },
]);
