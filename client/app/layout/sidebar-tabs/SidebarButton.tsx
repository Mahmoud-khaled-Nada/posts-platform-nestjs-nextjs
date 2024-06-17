import { SidebarButtonContainer } from "@/utils/styles";
import { Button } from "@/utils/styles/forms/button";
import { FriendRequestDetails } from "@/utils/types";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";

type Props = {
  friendRequests: FriendRequestDetails[];
  setAddFriendRequest: (value: boolean) => void;
  setActiveTab: (value: "friends" | "friendRequest") => void;
};

export const SidebarButton:FC<Props> = ({ friendRequests , setAddFriendRequest, setActiveTab}) => {
    const router = useRouter();
  const handleTabClick = useCallback((tab: "friends" | "friendRequest") => {
    setActiveTab(tab);
  }, []);
  return (
    <SidebarButtonContainer>
      <Button size="sm" variant="secondary" flex="yes" onClick={() => handleTabClick("friendRequest")}>
        Requests
        {friendRequests.length > 0 && <GoDotFill color="red" />}
      </Button>
      <Button size="sm" variant="secondary" onClick={() => handleTabClick("friends")}>
        Friends
      </Button>
      <Button size="sm" variant="secondary" onClick={() => router.push("/profile")}>
        Profile
      </Button>
      <Button size="sm" variant="primary" flex="yes" onClick={() => setAddFriendRequest(true)}>
        <IoMdPersonAdd />
        Add Friend
      </Button>
    </SidebarButtonContainer>
  );
};
