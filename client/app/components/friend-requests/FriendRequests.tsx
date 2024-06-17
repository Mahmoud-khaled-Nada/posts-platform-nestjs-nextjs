import defaultUserAvatar from "@/__assets__/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
import { formatRequestName, formatRequestType } from "@/utils/helper";
import { FriendRequestIcons } from "./FriendRequestIcons";
import Image from "next/image";
import {
  List,
  FriendRequestItem,
  FriendRequestContent,
  UserInfo,
  FullName,
  RequestStatus,
  RequestFrom,
} from "@/utils/styles";
import { FC, useContext, useEffect } from "react";
import { FriendRequestDetails } from "@/utils/types";
import { addFriendRequest } from "@/store/friends/friendRequestSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addFriend } from "@/store/friends/friendSlice";
import { SocketContext } from "@/utils/context/SocketContext";

type Props = {
  userId: number;
  friendRequests: FriendRequestDetails[];
};

export const FriendRequests: FC<Props> = ({ userId, friendRequests }) => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    const handleCreateFriendRequest = (data: any): void => {
      dispatch(addFriendRequest(data));
      if (userId === data.senderId) {
        toast.info(`${data.receiver.firstName} ${data.receiver.lastName} added a new post`);
      } else {
        toast.info(`${data.sender.firstName} ${data.sender.lastName} sent a new friend request`);
      }
    };

    const handleAcceptFriendRequest = (data: any) => {
      console.log("AcceptFriendRequest Event");
      dispatch(addFriend(data.friendRequest));
    };

    socket.on("connected", () => console.log("connected"));
    socket.on("onCreateFriendRequest", handleCreateFriendRequest);
    socket.on("onAcceptFriendRequest", handleAcceptFriendRequest);

    return () => {
      socket.off("connected");
      socket.off("onCreateFriendRequest", handleCreateFriendRequest);
      socket.off("onAcceptFriendRequest", handleAcceptFriendRequest);
    };
  }, [dispatch, userId, socket]);

  return (
    <List>
      {friendRequests.length === 0 ? (
        <div>No Friend Requests :(</div>
      ) : (
        friendRequests.map((friendRequest) => (
          <FriendRequestContent key={friendRequest.id}>
            <FriendRequestItem>
              <Image src={defaultUserAvatar} alt="avatar-user" className="w-8 h-8 rounded-full" />
              <UserInfo>
                <FullName>
                  {formatRequestName(userId, friendRequest)}
                  <RequestStatus>{friendRequest.status}</RequestStatus>
                </FullName>
                <RequestFrom>{formatRequestType(userId, friendRequest)}</RequestFrom>
              </UserInfo>
            </FriendRequestItem>
            <FriendRequestIcons friendRequest={friendRequest} userId={userId} />
          </FriendRequestContent>
        ))
      )}
    </List>
  );
};
