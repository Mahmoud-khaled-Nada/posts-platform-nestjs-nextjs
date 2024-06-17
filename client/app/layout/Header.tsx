"use client"
import { useState } from "react";
import { CreatePostContent } from "../components/models/CreatePostModel";
import { Navbar, NavbarFlexContainer, AuthFullName, DropdownContainer } from "@/utils/styles";
import { Button } from "@/utils/styles/forms/button";
import { formatFullName } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Header() {
  const { user } = useSelector((state:RootState) => state.user)
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <Navbar>
      <NavbarFlexContainer>
        <AuthFullName onClick={() => router.push('/')}>{user && formatFullName(user)}</AuthFullName>
        <DropdownContainer>
          <Button size="md" variant="primary" onClick={() => setShowModal(true)}>
            New Post
          </Button>
        </DropdownContainer>
      </NavbarFlexContainer>
      {showModal && <CreatePostContent setShowModal={setShowModal} />}
    </Navbar>
  );
}

export default Header;
