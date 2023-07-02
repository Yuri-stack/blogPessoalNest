import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { PostService } from '../services/post.service';
import { Posts } from '../entities/posts.entity';

@Controller("/posts")
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Posts[]> {
        return this.postService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    findbyTitle(@Param('title') title: string): Promise<Posts[]> {
        return this.postService.findByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Posts): Promise<Posts> {
        return this.postService.create(post);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: Posts): Promise<Posts> {
        return this.postService.update(post);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postService.delete(id);
    }
}