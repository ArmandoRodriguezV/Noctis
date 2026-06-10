import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '../../modules/presentation/Home/pages/Home';
import Area from '../components/molecules/Area/Area';
import { NotificationsProvider } from '../context/NotificationCtx';

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
    static HOME = "/";

    static router = createBrowserRouter([
        {
            element: <RootLayout />,
            children: [
                {
                    path: Router.HOME,
                    element: <Home />
                }
            ]
        }
    ])
}