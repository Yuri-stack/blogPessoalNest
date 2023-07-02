import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, ILike } from 'typeorm'
import { Posts } from '../entities/posts.entity'

export class PostService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>
    ) { }

    async findAll(): Promise<Posts[]> {
        return await this.postRepository.find();
    }

    async findById(id: number): Promise<Posts> {
        let post = await this.postRepository.findOne({ where: { id } });

        if (!post) throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return post;
    }

    async findByTitle(title: string): Promise<Posts[]> {
        return await this.postRepository.find({
            where: {
                titulo: ILike(`%${title}%`)
            }
        });
    }

    async create(post: Posts): Promise<Posts> {
        return await this.postRepository.save(post);
    }

    async update(post: Posts): Promise<Posts> {
        let searchPost: Posts = await this.findById(post.id);

        if (!searchPost || !post.id) throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return await this.postRepository.save(post);
    }

    async delete(id: number): Promise<DeleteResult> {
        let searchPost: Posts = await this.findById(id);

        if (!searchPost) throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return await this.postRepository.delete(id);
    }
}