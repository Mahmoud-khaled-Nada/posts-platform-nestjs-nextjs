import defaultUserAvatar from "@/__assets__/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
import { FlexMenuContainer, FlexItem, FullName, List, UserInfo, LastMessage } from "@/utils/styles";
import Image from "next/image";
import { FriendRequestIcons } from "../friend-requests/FriendRequestIcons";
import { useRouter } from "next/navigation";
export const ConversationMenu = () => {
  const router = useRouter();
  const userId = 20;
  return (
    <List style={{ margin: "15px" }}>
      <FlexMenuContainer>
        <FlexItem onClick={() => router.push(`/conversation/${userId}`)}>
          <Image src={defaultUserAvatar} alt="avatar-user" className="w-8 h-8 rounded-full" />
          <UserInfo>
            <FullName>Mahmoud Nada</FullName>
            <LastMessage>You: Hey there!</LastMessage>
          </UserInfo>
          {/* <span>Last seen: 15m ago</span> */}
        </FlexItem>
      </FlexMenuContainer>
    </List>
  );
};
