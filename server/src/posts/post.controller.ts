import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IPostService } from './post';
import { Routes, Services } from '../utils/constants';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '@prisma/client';
import { Auth } from '../utils/decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentDto } from './dto/comment.dto';
@Controller(Routes.POSTS)
export class PostController {
  constructor(
    @Inject(Services.POSTS) private readonly postService: IPostService,
    private readonly events: EventEmitter2,
  ) {}

  @Post('create')
  async createPost(@Body() { content }: CreatePostDto, @Auth() user: User) {
    const request = { content, userId: user.id };
    if (!request.userId) throw new NotFoundException('Invalid user');
    const response = await this.postService.create(request);
    this.events.emit('post.create', response);
    return response;
  }

  @Get()
  async getPosts() {
    return await this.postService.posts();
  }

  @Post('/add-like/:postId')
  async addLike(
    @Auth() { id: userId }: User,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    const parmas = { postId, userId };
    const response = await this.postService.likePostByUserId(parmas);
    this.events.emit('like.create', response);
    return response;
  }

  @Post('/add-comment/:postId')
  async addComment(
    @Auth() { id: creator }: User,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() { content }: CommentDto,
  ) {
    const parmas = { postId, creator, content };
    const response = await this.postService.createComment(parmas);
    // this.events.emit('comment.create', response);
    return response;
  }
}
