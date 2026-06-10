import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { ApiResponse } from "../routes/Response";


interface NotificationItem extends ApiResponse<void> {
    id: number;
}

interface NotificationsContextType {
    notifications: NotificationItem[];
    pushNotification: (notification: ApiResponse<void>) => void;
}

const NotificationsContext =
    createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const pushNotification = (notification: ApiResponse<void>) => {
        const id = Date.now();

        const newNotification: NotificationItem = {
            ...notification,
            id,
        };

        setNotifications((prev) => [...prev, newNotification]);

        setTimeout(() => {
            setNotifications((prev) =>
                prev.filter((n) => n.id !== id)
            );
        }, 3000);
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                pushNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error(
            "useNotification debe usarse dentro de NotificationsProvider"
        );
    }

    return context;
}