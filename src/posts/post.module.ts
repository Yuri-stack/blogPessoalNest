import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Posts } from './entities/posts.entity'
import { PostService } from './services/post.service'
import { PostController } from './controllers/post.controllers'
import { ThemeModule } from 'src/themes/theme.module'
import { ThemeService } from 'src/themes/services/theme.service'

@Module({
    imports: [TypeOrmModule.forFeature([Posts]), ThemeModule],
    providers: [PostService, ThemeService],
    controllers: [PostController],
    exports: [TypeOrmModule]
})

export class PostModule { }