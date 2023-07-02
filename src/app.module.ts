import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/posts.entity';
import { PostModule } from './posts/post.module';
import { Theme } from './themes/entities/theme.entity';
import { ThemeModule } from './themes/theme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoalnest',
      entities: [Posts, Theme],
      synchronize: true
    }),
    PostModule,
    ThemeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
