import { SimplifiedFriendshipInfo } from '@/features/friends';
import { Notification } from '@/features/notifications/types/notification.type';
import { mapFriendRequestToNotification } from '../util.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationItem from './NotificationItem.tsx';
import { BellSlashIcon } from '@heroicons/react/24/outline';

interface NotificationDrawerProps {
  onClose: () => void;
  friendRequests: SimplifiedFriendshipInfo[];
}

const NotificationDrawer = ({
  onClose,
  friendRequests,
}: NotificationDrawerProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNotifications(friendRequests.map(mapFriendRequestToNotification));
  }, [friendRequests]);

  const handleNavigate = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="h-screen p-4">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>
      {/* body */}

      {notifications.length === 0 && (
        <div className="text-center">
          <BellSlashIcon className="h-16 mx-auto mb-4 mt-16" />
          <p className="text-lg">No new notifications</p>
        </div>
      )}
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.body}
            onClick={() => handleNavigate(notification.url!)}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationDrawer;
