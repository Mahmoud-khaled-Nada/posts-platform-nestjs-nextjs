"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaUsers } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SidebarContainer, SidebarContent, SidebarTabs, SidebarTab, IconBadge } from "@/utils/styles";
import SidebarTabsOptions from "./sidebar-tabs/SidebarTabsOptions";
import { getNotificationQuery } from "@/services/queries";

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sidebar-tabs" | "notifications">("sidebar-tabs");

  const handleTabClick = useCallback((tab: "sidebar-tabs" | "notifications") => {
    setActiveTab(tab);
  }, []);

  const friendRequests = useSelector((state: RootState) => state.friendRequest.friendRequests);
  const { user } = useSelector((state:RootState) => state.user)

  const friendNotificationCount = useMemo(() => {
    if (friendRequests.length > 0 && friendRequests.length <= 10) {
      return <IconBadge>{friendRequests.length}</IconBadge>;
    } else if (friendRequests.length > 10) {
      return <IconBadge>10+</IconBadge>;
    } else {
      return null;
    }
  }, [friendRequests]);

  // improve this before
  const { data } = getNotificationQuery();
  return (
    <SidebarContainer>
      <SidebarContent>
        <SidebarTabs>
          <SidebarTab selected={activeTab === "sidebar-tabs"} onClick={() => handleTabClick("sidebar-tabs")}>
            <FaUsers />
            {friendNotificationCount}
          </SidebarTab>
          <SidebarTab
            selected={activeTab === "notifications"}
            onClick={() => handleTabClick("notifications")}
          >
            <IoMdNotifications />
            <IconBadge>{data && data.length > 0 && data.length < 10 ? data.length : "10+"}</IconBadge>
          </SidebarTab>
        </SidebarTabs>
        {activeTab === "sidebar-tabs" && <SidebarTabsOptions friendRequests={friendRequests || []} />}
        {activeTab === "notifications" && <NotificationsList />}
      </SidebarContent>
    </SidebarContainer>
  );
};
