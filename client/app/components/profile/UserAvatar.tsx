"use client";
import { FileInput, UserAvatarContainer } from "@/utils/styles/settings";
import { DivMouseEvent, InputChangeEvent } from "@/utils/types";
import { Dispatch, FC, SetStateAction, useContext, useRef } from "react";

type Props = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: Dispatch<SetStateAction<string>>;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};

export const UserAvatar: FC<Props> = ({
  avatarSource,
  avatarSourceCopy,
  setAvatarSourceCopy,
  setAvatarFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onAvatarClick = (e: DivMouseEvent) => fileInputRef.current?.click();
  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    console.log("print from avatar")
    console.log(file);
    setAvatarSourceCopy(file ? URL.createObjectURL(file) : avatarSource);
    setAvatarFile(file || undefined);
  };

  return (
    <>
      <UserAvatarContainer onClick={onAvatarClick} url={avatarSourceCopy} />
      <FileInput type="file" ref={fileInputRef} accept="image/*" onChange={onFileChange} />
    </>
  );
};
