import React from 'react';
import { useGame } from '../../contexts/GameContext';
import styles from './Notification.module.css';

const Notification = () => {
    const { notification } = useGame();

    if (!notification) return null;

    return (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
        </div>
    );
};

export default Notification;