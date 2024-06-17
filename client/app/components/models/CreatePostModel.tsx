import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaField from "../common/TextareaField";
import { PostParams } from "../../utils/types";
import { ModalBody, StyledButton, ModalFooter } from "@/utils/styles/model";
import { Loaders } from "../common/Loaders";
import { createNewPostMutation } from "@/services/mutation";
import { MainModelContainer } from "../common/MainModelContainer";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};


export const CreatePostContent: FC<Props> = ({ setShowModal }) => {
  const mutation = createNewPostMutation();

  const { register, handleSubmit } = useForm<PostParams>();
  const onSubmit: SubmitHandler<PostParams> = async (data: PostParams) => {
    await mutation.mutateAsync(data);
    toast.success("Post created successfully");
    setShowModal(false);
  };

  return (
    <MainModelContainer setShowModal={setShowModal} title="Create new post">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <TextareaField name="content" register={register} />
        </ModalBody>
        <ModalFooter>
          <StyledButton type="submit">
            {mutation.isPending && <Loaders />}
            Save changes
          </StyledButton>
        </ModalFooter>
      </form>
    </MainModelContainer>
  );
};
