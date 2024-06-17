import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendRequests } from "@/components/friend-requests/FriendRequests";
import { YourFriendsList } from "@/components/friends/YourFriendsList";
import { AddFriendRequestModel } from "@/components/models/AddFriendRequestModel";
import { getFriendRequestsQuery, getFriendsQuery } from "@/services/queries";
import { AppDispatch, RootState } from "@/store";
import { setFriendRequests } from "@/store/friends/friendRequestSlice";
import { setFriends } from "@/store/friends/friendSlice";
import { FriendRequestDetails } from "@/utils/types";
import { SidebarButton } from "./SidebarButton";

type Props = {
  friendRequests: FriendRequestDetails[];
};

const SidebarTabsOptions: FC<Props> = ({ friendRequests }) => {
  const [addFriendRequest, setAddFriendRequest] = useState(false);
  const [activeTab, setActiveTab] = useState<"friends" | "friendRequest">("friendRequest");

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const friends = useSelector((state: RootState) => state.friend.friends);

  const { data: friendRequest, isSuccess: isFriendRequestSuccess } = getFriendRequestsQuery();
  const { data: friendsQuery, isSuccess: isFriendsSuccess } = getFriendsQuery();

  useEffect(() => {
    if (isFriendRequestSuccess && friendRequest) {
      dispatch(setFriendRequests(friendRequest.data));
    }
    if (isFriendsSuccess && friendsQuery) {
      dispatch(setFriends(friendsQuery));
    }
  }, [dispatch, isFriendRequestSuccess, friendRequest, isFriendsSuccess, friendsQuery]);

  const tabSwitch = useMemo(() => {
    switch (activeTab) {
      case "friends":
        return <YourFriendsList friends={isFriendsSuccess ? friends : []} userId={user?.id!} />;
      case "friendRequest":
      default:
        return <FriendRequests userId={user?.id!} friendRequests={friendRequests} />;
    }
  }, [activeTab, isFriendsSuccess, friends, friendRequests, user?.id]);

  return (
    <>
      <SidebarButton
        friendRequests={friendRequests}
        setAddFriendRequest={setAddFriendRequest}
        setActiveTab={setActiveTab}
      />
      {tabSwitch}
      {addFriendRequest && <AddFriendRequestModel setShowModal={setAddFriendRequest} />}
    </>
  );
};

export default SidebarTabsOptions;
