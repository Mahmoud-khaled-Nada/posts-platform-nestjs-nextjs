"use client"
import styled from "styled-components";
import colors from "./colors";
import { NotificationsListItemPrpos, SidebarTabPrpos } from "../types";

export const Navbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 50;
  font-size: 15px;
  color: #4b5563;
  @media (prefers-color-scheme: dark) {
    background-color: ${colors.neutral900};
    border-bottom: 1px solid #374151;
  }
`;

export const NavbarFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px;
`;

export const AuthFullName = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  @media (prefers-color-scheme: dark) {
    color: #3b82f6;
  }
`;

// Dropdown container
export const DropdownContainer = styled.div`
  position: relative;
  margin-right: 0.5rem;
`;

// End Navbar ....

export const MainContent = styled.div`
  width: 100%;
  margin-top: 10%;
`;

// Sidebar container styling
export const SidebarContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #004;
  position: relative;
`;

// Common sidebar content styling
export const SidebarContent = styled.div`
  position: fixed;
  width: 33%;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #202225;
  background-color: ${colors.neutral900};
`;


// Sidebar tabs container styling
export const SidebarTabs = styled.div`
  padding: 20px 0;
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

export const SidebarTab = styled.div<SidebarTabPrpos>`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.neutral400};
  transition: background-color 0.3s ease;
  cursor: pointer;

  background-color: ${(props) => (props.selected ? colors.neutral800 : "transparent")};

  &:hover {
    background-color: ${colors.neutral800};
  }

  svg {
    margin-right: 10px;
  }
`;

export const SidebarButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 18px;
`;

// Profile picture styling
// export const ProfileAvatar = styled.img`
//   width: 2rem;
//   height: 2rem;
//   border-radius: 9999px;
// `;

// User info container styling
export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  color: #fff;
`;

// User name styling
export const FullName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// User email styling
export const UserName = styled.p`
  font-size: 0.875rem;
  color: rgba(107, 114, 128, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RequestStatus = styled.span`
  margin-left: 10px;
  font-size: 0.875rem;
  color: rgba(107, 114, 128, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const RequestFrom = styled.span`
  margin-left: 10px;
  font-size: 0.875rem;
  color: rgba(107, 114, 128, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

//! End Sidebar...

export const PostContainer = styled.div`
  width: 100%;
  margin: 10px;
  background: ${colors.neutral800};
  border-radius: 10px;
  padding: 10px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #202225;
`;

export const PostContent = styled.div`
  display: flex;
  align-items: center;
`;

export const PostAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: #000fff;
  border-radius: 50%;
  margin-right: 10px;
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostName = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: ${colors.neutral400};
`;

export const PostTime = styled.div`
  font-size: 0.8em;
  color: ${colors.neutral500};
`;

export const PostButtons = styled.div`
  display: flex;
  gap: 10px;
  color: ${colors.neutral600};
  cursor: pointer;

  & > * {
    transition: color 0.3s ease;
    &:hover {
      color: ${colors.neutral400};
    }
  }
`;

export const PostBody = styled.div`
  padding: 10px;
  border-bottom: 2px solid #202225;
`;

export const PostText = styled.p`
  width: 100%;
  margin-bottom: 10px;
`;


export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const FooterItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  & span {
    margin-left: 5px;
  }
`;

//Implement Comment

export const CommentContainer = styled.div`
  width: 100%;
  margin: 10px auto 0;
  background: ${colors.neutral800};
  padding: 10px;
  border-top: 2px solid #202225;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

export const CommentContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  background: ${colors.neutral800};
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const CommentAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #000fff;
  border-radius: 50%;
  margin-right: 10px;
`;

export const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  background-color: #333333;
  padding: 10px;
  border-radius: 15px;
`;

export const CommentNameAndTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.neutral400};
`;

export const CommentTime = styled.div`
  font-size: 0.8em;
  color: ${colors.neutral500};
`;

export const CommentText = styled.div`
  font-size: 0.875rem;
  color: ${colors.neutral400};
  margin-top: 5px;
`;

export const TextareaContainer = styled.form`
  position: relative;
`;

export const Textarea = styled.textarea`
  padding: 16px 16px 48px;
  width: 100%;
  border: 1px solid ${colors.neutral600};
  border-radius: 8px;
  font-size: 0.875rem;
  background: ${colors.neutral900};
  color: ${colors.neutral400};
  resize: none;
  overflow: hidden;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const Toolbar = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  padding: 8px;
  border-radius: 0 0 8px 8px;
  background: ${colors.neutral900};
`;

export const ToolbarContent = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 7px;
  background: transparent;
  color: ${colors.neutral500};
  cursor: pointer;

  &:hover {
    color: #3b82f6;
  }

  &:focus {
    z-index: 10;
    outline: none;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &.send {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// List container styling
export const List = styled.ul`
  max-width: 32rem;
  border-color: rgba(209, 213, 219, 1);
  padding: 0 10px;
`;

// Individual list item styling
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;

  @media (min-width: 640px) {
    padding-bottom: 1rem;
    flex-direction: row;
    gap: 0.5rem;
  }
`;

// List item content container styling
export const ListItemContent = styled.div`
  @media (min-width: 640px) {
  }
`;

//!   List Notificatios container styling

export const NotificationsList = styled.ul`
  width: 100%;
  border-bottom: 1px solid #2b2b2b;
`;

// Individual list item styling
export const NotificationsListItem = styled.li`
  padding: 5px 10px;
  @media (min-width: 640px) {
    padding: 5px 10px;
  }
`;

// List item content container styling
export const NotificationsListItemContent = styled.div<NotificationsListItemPrpos>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${(props) => (props.selected ? 0.33 : 1)};
  @media (min-width: 640px) {
    flex-direction: row;
    gap: 0.5rem;
  }
`;

export const IconBadge = styled.div`
  background: #ff2a2a;
  height: 20px;
  width: 20px;
  border-radius: 5px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

// Individual list item styling
export const FriendRequestContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;

  @media (min-width: 640px) {
    padding-bottom: 1rem;
  }
`;

// List item content container styling
export const FriendRequestItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 0.5rem;
  }
`;