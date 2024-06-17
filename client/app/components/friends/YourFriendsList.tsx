import defaultUserAvatar from "@/__assets__/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
import { formatFriendFullName } from "@/utils/helper";
import { List, ListItem, UserInfo, UserName, FullName } from "@/utils/styles";
import { FriendsDetails } from "@/utils/types";
import Image from "next/image";
import { FC } from "react";

type Props = {
  friends: FriendsDetails[];
  userId: number;
};

export const YourFriendsList: FC<Props> = ({ friends, userId }) => {
  return (
    <List>
      {friends.length > 0 &&
        friends.map((friend, index) => (
          <ListItem key={index}>
            <Image src={defaultUserAvatar} 
               alt="avatar-user"
               className="w-8 h-8 rounded-full"
            />
            <UserInfo>
              <FullName>{formatFriendFullName(userId, friend)}</FullName>
              <UserName>
                {friend.senderId === userId ? friend.receiver.username : friend.sender.username}
              </UserName>
            </UserInfo>
          </ListItem>
        ))}
    </List>
  );
};
