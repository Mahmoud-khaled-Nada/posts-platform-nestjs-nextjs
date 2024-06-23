"use client";
import React, { useMemo } from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  SidebarContainer,
  SidebarContent,
  SidebarTabs,
  SidebarTab,
  IconBadge,
} from "@/utils/styles";
import SidebarTabsOptions from "./sidebar-tabs/SidebarTabsOptions";
import { getNotificationQuery } from "@/services/queries";
import { setActiveTab } from "@/store/tabSlice";

export const Sidebar: React.FC = () => {
  const { sidebarTabs, notificationsTab } = useSelector(
    (state: RootState) => state.tabs
  );
  const dispatch = useDispatch<AppDispatch>();

  const friendRequests = useSelector(
    (state: RootState) => state.friendRequest.friendRequests
  );

  const friendNotificationCount = useMemo(() => {
    if (friendRequests.length > 0 && friendRequests.length <= 10) {
      return <IconBadge>{friendRequests.length}</IconBadge>;
    } else if (friendRequests.length > 10) {
      return <IconBadge>10+</IconBadge>;
    } else {
      return null;
    }
  }, [friendRequests]);

  const { data: notifications } = getNotificationQuery();

  const notificationCount = useMemo(() => {
    if (notifications && notifications.length > 0 && notifications.length <= 10) {
      return <IconBadge>{notifications.length}</IconBadge>;
    } else if (notifications && notifications.length > 10) {
      return <IconBadge>10+</IconBadge>;
    } else {
      return null;
    }
  }, [notifications]);

  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarTabs>
          <SidebarTab
            selected={sidebarTabs === "sidebar-tabs"}
            onClick={() => dispatch(setActiveTab("sidebar-tabs"))}
          >
            <FaUsers />
            {friendNotificationCount}
          </SidebarTab>
          <SidebarTab
            selected={notificationsTab === "notifications"}
            onClick={() => dispatch(setActiveTab("notifications"))}
          >
            <IoMdNotifications />
            {notificationCount}
          </SidebarTab>
        </SidebarTabs>
        {sidebarTabs === "sidebar-tabs" && (
          <SidebarTabsOptions friendRequests={friendRequests || []} />
        )}
        {notificationsTab === "notifications" && <NotificationsList />}
      </SidebarContent>
    </SidebarContainer>
  );
};
