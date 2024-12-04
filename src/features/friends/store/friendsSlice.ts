import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
// import { storage } from '@/utils/storage';
import {
  FriendshipStatus,
  SimplifiedFriendshipInfo,
} from '../types/friend.interface';

interface FriendsSliceState {
  friends: SimplifiedFriendshipInfo[];
}

const initialState: FriendsSliceState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: 'friendsSlice',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<SimplifiedFriendshipInfo[]>) => {
      state.friends = action.payload;
    },

    clearFriends: (state) => {
      state.friends = [];
    },
  },
});

export const { setFriends, clearFriends } = friendsSlice.actions;

export default friendsSlice.reducer;

export const selectFriends = (state: RootState) => state.friendsSlice.friends;

export const selectPendingFriendRequests = createSelector(
  selectFriends,
  (friends) =>
    friends.filter(
      (friend) =>
        friend.status === FriendshipStatus.Pending && !friend.isInitiator,
    ),
);

export const selectConfirmedFriends = createSelector(selectFriends, (friends) =>
  friends
    .filter((friend) => friend.status === FriendshipStatus.Accepted)
    .map((friend) => friend.profile),
);
