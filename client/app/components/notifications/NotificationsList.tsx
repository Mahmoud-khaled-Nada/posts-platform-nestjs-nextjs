/* eslint-disable react/jsx-key */
import {
  NotificationsList as Notification,
  NotificationsListItem,
  NotificationsListItemContent,
  UserInfo,
  FullName,
  UserName,
} from "@/utils/styles";

import defaultUserAvatar from "@/__assets__/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
import Image from "next/image";
import { getNotificationQuery } from "@/services/queries";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const NotificationsList = () => {
  const { user } = useSelector((state:RootState) => state.user)
  const { data } = getNotificationQuery();
  return (
    <Notification>
      {data &&
        data?.length > 0 &&
        data?.map((item, index) => (
          <NotificationsListItem key={index}>
            <NotificationsListItemContent selected={false}>
              <Image src={defaultUserAvatar} alt="avatar-user" className="w-8 h-8 rounded-full" />
              <UserInfo>
                <FullName>
                  {item.data?.senderId === user?.id
                    ? `${item.data?.receiver.firstName} ${item.data?.receiver.lastName}`
                    : `${item.data?.sender.firstName} ${item.data?.sender.lastName}`}
                </FullName>
                <UserName>{item.notifiableType}</UserName>
              </UserInfo>
            </NotificationsListItemContent>
          </NotificationsListItem>
        ))}
    </Notification>
  );
};
