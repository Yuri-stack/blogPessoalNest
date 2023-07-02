import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { PostService } from '../services/post.service';
import { Posts } from '../entities/posts.entity';

@Controller("/posts")
export class PostController {
    constructor(private readonly postsService: PostService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Posts[]> {
        return this.postsService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postsService.findById(id);
    }

    @Get('/title/:title')
    @HttpCode(HttpStatus.OK)
    findbyTitle(@Param('title') title: string): Promise<Posts[]> {
        return this.postsService.findByTitle(title);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Posts): Promise<Posts> {
        return this.postsService.create(post);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() post: Posts): Promise<Posts> {
        return this.postsService.update(post);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.delete(id);
    }
}