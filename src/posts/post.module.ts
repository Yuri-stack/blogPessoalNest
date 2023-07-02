import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Posts } from './entities/posts.entity'
import { PostService } from './services/post.service'
import { PostController } from './controllers/post.controllers'

@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    providers: [PostService],
    controllers: [PostController],
    exports: [TypeOrmModule]
})

export class PostModule { }