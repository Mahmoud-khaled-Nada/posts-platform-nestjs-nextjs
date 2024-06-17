"use client";
import { Loaders } from "../common/Loaders";
import { FC, useState } from "react";
import { addFriendRequestMutation } from "@/services/mutation";
import { Input, Label } from "@/utils/styles/forms/input";
import { Button } from "@/utils/styles/forms/button";
import { ModalBody, ModalFooter } from "@/utils/styles/model";
import { MainModelContainer } from "../common/MainModelContainer";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddFriendRequestModel: FC<Props> = ({ setShowModal }) => {
  const [username, setusername] = useState("");
  const mutation = addFriendRequestMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({username});
    setShowModal(false);
  };

  return (
    <MainModelContainer setShowModal={setShowModal} title="Add friend request">
      <form onSubmit={onSubmit}>
        <ModalBody>
          <Label htmlFor="sendFriendRequest">Send friend request</Label>
          <Input onChange={(e) => setusername(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" width="100" size="sm" disabled={!username}>
            {mutation.isPending && <Loaders style="m-0 mr-5 mb-[-5px]" />}
            send
          </Button>
        </ModalFooter>
      </form>
    </MainModelContainer>
  );
};
