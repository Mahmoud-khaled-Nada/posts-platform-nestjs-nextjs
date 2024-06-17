import { FC } from "react";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { acceptFriendRequestMutation, rejectFriendRequestMutation } from "@/services/mutation";
import { FriendRequestItem } from "@/utils/styles";
import { FriendRequestDetails } from "@/utils/types";

type Props = {
  friendRequest: FriendRequestDetails;
  userId: number;
};

export const FriendRequestIcons: FC<Props> = ({ friendRequest, userId }) => {
  const acceptMutation = acceptFriendRequestMutation();
  const rejectMutation = rejectFriendRequestMutation();

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(friendRequest.senderId);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectMutation.mutateAsync(friendRequest.id);
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };



  return (
    <FriendRequestItem>
      {userId !== friendRequest.senderId && (
        <IoCheckmarkSharp color="green" cursor="pointer" onClick={handleAccept} />
      )}
      <IoClose color="red" cursor="pointer" onClick={handleReject} />
    </FriendRequestItem>
  );
};
