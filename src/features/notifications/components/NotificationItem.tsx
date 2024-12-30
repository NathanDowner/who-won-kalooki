import UserProfileImage from '@/components/UserProfileImage';
import { Notification } from '../types/notification.type';

type Props = {
  notification: Notification;
  onClick: () => void;
};

const NotificationItem = ({ notification, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center gap-2 border-4 border-black rounded-md p-2"
    >
      <UserProfileImage
        imgUrl={notification.imgUrl}
        className="h-10 w-10 border-1"
      />
      <div>
        <h2 className="font-bold">{notification.title}</h2>
        <p>{notification.body}</p>
        <button onClick={onClick}>hello</button>
      </div>
    </div>
  );
};

export default NotificationItem;
