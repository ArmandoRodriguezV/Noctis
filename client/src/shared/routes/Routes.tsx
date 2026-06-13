import { createBrowserRouter, Outlet } from 'react-router-dom';
import Area from '../components/molecules/Area/Area';
import { NotificationsProvider } from '../context/NotificationCtx';
import Login from '../../modules/presentation/Auth/pages/Login/Login';
import Register from '../../modules/presentation/Auth/pages/Register/Register';
import Redirect from './Redirect';
import Home from '../../modules/presentation/Home/pages/Home';

function RootLayout() {
    return (
        <>
            <NotificationsProvider>
                <Area />
                <Outlet />
            </NotificationsProvider>
        </>
    );
}

export class Router {
    static LOGIN = "/";
    static REGISTER = "/register";
    static HOME = "/home";
    static PROJECT = "/project";
    static PROFILE = "/profile";

    static router = createBrowserRouter([
        {
            element: <RootLayout />,
            children: [
                {
                    path: Router.LOGIN,
                    element: <Login />
                },
                {
                    path: Router.REGISTER,
                    element: <Register />
                },
                {
                    path: Router.HOME,
                    element: <Redirect child={<Home />} />
                }
            ]
        }
    ])
}