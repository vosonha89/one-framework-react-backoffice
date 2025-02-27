import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from './AppProtectedRoute ';
import Login from './views/login/Login';
import Home from './views/home/Home';

export class AppRouterName {
  public static readonly home = '/';
  public static readonly noMatch = '*';
  public static readonly login = '/dang-nhap';
}

export const AppRouter = [
  {
    path: AppRouterName.noMatch,
    element: <Navigate to={AppRouterName.home} replace />,
  },
  {
    path: AppRouterName.home,
    element:
      <ProtectedRoute>
        <Home></Home>
      </ProtectedRoute>,
  },
  {
    path: AppRouterName.login,
    element: <Login />,
  },
];