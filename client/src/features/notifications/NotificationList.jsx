import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await api.get('/notifications');
            setNotifications(response.data);
        };
        fetchNotifications();
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
