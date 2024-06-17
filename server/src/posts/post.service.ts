import { Inject, Injectable } from '@nestjs/common';
import { IPostService } from './post';
import { Repository, Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user';
import { CommentParams, CreatePostParams, LikeParams } from 'src/utils/types';
import { Post } from '@prisma/client';
import { PostsRepository } from './repository/posts.repository';
import { LikeRepository } from './repository/like.repository';
import {
  AlreadyException,
  NotFoundException,
  UserNotFoundException,
} from 'src/exceptions';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
    @Inject(Repository.POSTS)
    private readonly postsRepository: PostsRepository,
    @Inject(Repository.LIKE)
    private readonly likeRepository: LikeRepository,
  ) {}

  async create(params: CreatePostParams): Promise<Post> {
    return await this.postsRepository.createNewPost(params);
  }

  async posts(): Promise<Post[]> {
    return await this.postsRepository.getAllPosts();
  }

  async findPost(postId: number): Promise<Post> {
    return await this.postsRepository.findPost(postId);
  }

  async likePostByUserId(parmas: LikeParams): Promise<Post | any> {
    const user = await this.userService.findUser(parmas.userId);
    if (!user) throw new UserNotFoundException();

    const post = await this.findPost(parmas.postId);
    if (!post) throw new NotFoundException('Post');

    const isLiked =
      await this.likeRepository.checkIsLikePostAlreadyAdded(parmas);

    return isLiked.length === 0
      ? await this.likeRepository.addLike(parmas)
      : new AlreadyException('Post already liked');
  }

  async createComment(params: CommentParams) {
    const post = await this.findPost(params.postId);
    if (!post) throw new NotFoundException('Post');
    const addComment = await this.likeRepository.postComment(params);

    return addComment;
  }
}
