import { SimplifiedFriendshipInfo } from '@/features/friends';
import {
  Notification,
  NotificationType,
} from '@/features/notifications/types/notification.type';
import { AppRoutes } from '@/routes';

export function mapFriendRequestToNotification(
  friendRequest: SimplifiedFriendshipInfo,
): Notification {
  return {
    title: 'New Friend Request',
    body: `You have a friend request from ${friendRequest.profile.fullName}`,
    url: AppRoutes.friends,
    imgUrl: friendRequest.profile.imgUrl,
    type: NotificationType.FriendRequest,
  };
}
