import { Post } from '@prisma/client';
import { CommentParams, CreatePostParams, LikeParams } from 'src/utils/types';

export interface IPostService {
  create(params: CreatePostParams): Promise<Post>;
  posts(): Promise<Post[]>;
  findPost(postId: number): Promise<Post>;
  likePostByUserId(parmas: LikeParams): Promise<Post>;
  createComment(parmas: CommentParams)
  // likesPost()
  // hasUserLikedPost()
  // postComment()
  // postComment()
  // postComment()
  // postComment()
}
