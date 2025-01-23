export type Notification = {
  title: string;
  type: NotificationType;
  body: string;
  url?: string;
  imgUrl?: string;
};

export const enum NotificationType {
  FriendRequest = 'FriendRequest',
}
