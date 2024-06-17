"use client";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommentParams } from "@/utils/types";
import { IoAttachOutline, IoMicOutline, IoSend } from "react-icons/io5";
import { TextareaContainer, Textarea, Toolbar, ToolbarContent, ButtonGroup, Button } from "@/utils/styles";
import { addCommentMutation } from "@/services/mutation";

type Props = {
  postId: number;
};

export const PostTextarea: FC<Props> = ({ postId }) => {
  const mutation = addCommentMutation(postId!);

  const { register, handleSubmit } = useForm<CommentParams>();
  const onSubmit: SubmitHandler<CommentParams> = async (data: CommentParams) => mutation.mutateAsync(data);
  return (
    <TextareaContainer onSubmit={handleSubmit(onSubmit)}>
      <Textarea {...register("content")} placeholder="Ask me anything..." />
      <Toolbar>
        <ToolbarContent>
          <ButtonGroup>
            <Button>
              <IoAttachOutline />
            </Button>
            <Button>
              <IoMicOutline />
            </Button>
            <Button className="send">
              <IoSend type="submit" />
            </Button>
          </ButtonGroup>
        </ToolbarContent>
      </Toolbar>
    </TextareaContainer>
  );
};
