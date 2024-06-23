"use client";
import { ProfileCover } from "@/components/profile/ProfileCover";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { RootState } from "@/store";
import { UserProfileAPI } from "@/utils/apis";
import { Button } from "@/utils/styles/forms/button";
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileEditActionBar,
  ProfileSection,
  SettingsProfileUserDetails,
} from "@/utils/styles/settings";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";

function ProfilePage() {
  const [avatarFile, setAvatarFile] = useState<File>();
  const profile = useSelector((state: RootState) => state.user.user?.profile);

  const [avatarSource] = useState(profile?.avatar || "");
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(profile?.avatar || "");

  const [bannerSource, setBannerSource] = useState(profile?.banner || "");

  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about, setAbout] = useState(profile?.about || "");
  const [aboutCopy, setAboutCopy] = useState(about || "Hello World!");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updating About");
    setAbout(profile?.about || "");
  }, [profile?.about]);

  useEffect(() => {
    console.log("Updating Banner URL");
    console.log(profile?.banner);
    setBannerSource(profile?.banner || "");
    setBannerSourceCopy(profile?.banner || "");
  }, [profile?.banner]);

  const isChanged = () => aboutCopy !== about || bannerFile || avatarFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setAvatarSourceCopy(avatarSource);
    setIsEditing(false);
    setAvatarFile(undefined);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
    URL.revokeObjectURL(avatarSourceCopy);
  };

  const save = async () => {
    const formData = new FormData();
    bannerFile && formData.append("banner", bannerFile);
    avatarFile && formData.append("avatar", avatarFile);
    about !== aboutCopy && formData.append("about", aboutCopy);
    try {
      setLoading(true);
      console.log(formData);
      const { data: updatedUser } = await UserProfileAPI(formData);
      console.log(updatedUser);
      URL.revokeObjectURL(bannerSourceCopy);
      URL.revokeObjectURL(avatarSourceCopy);
      setBannerFile(undefined);
      setAvatarFile(undefined);
      // updateAuthUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ProfileCover
        bannerSource={bannerSource}
        bannerSourceCopy={bannerSourceCopy}
        setBannerSourceCopy={setBannerSourceCopy}
        setBannerFile={setBannerFile}
      />
      <ProfileSection>
        <SettingsProfileUserDetails>
          <UserAvatar
            avatarSource={avatarSource}
            avatarSourceCopy={avatarSourceCopy}
            setAvatarSourceCopy={setAvatarSourceCopy}
            setAvatarFile={setAvatarFile}
          />
        </SettingsProfileUserDetails>
        <ProfileAboutSection>
          <ProfileAboutSectionHeader>
            <label htmlFor="about">About Me</label>
            <BiEdit cursor="pointer" strokeWidth={2} size={28} onClick={() => setIsEditing(!isEditing)} />
          </ProfileAboutSectionHeader>
          <ProfileDescriptionField
            maxLength={200}
            disabled={!isEditing}
            value={aboutCopy}
            onChange={(e) => setAboutCopy(e.target.value)}
          />
        </ProfileAboutSection>
      </ProfileSection>

      {isChanged() && (
        <ProfileEditActionBar>
          <div>
            <span>You have unsaved changes</span>
          </div>
          <div className="buttons">
            <Button size="md" variant="secondary" onClick={reset} disabled={loading}>
              Reset
            </Button>
            <Button size="md" onClick={save} disabled={loading}>
              Save
            </Button>
          </div>
        </ProfileEditActionBar>
      )}
    </>
  );
}

export default ProfilePage;
