import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, ILike } from 'typeorm'
import { Theme } from '../entities/theme.entity'

export class ThemeService {
    constructor(
        @InjectRepository(Theme)
        private themeRepository: Repository<Theme>
    ) { }

    async findAll(): Promise<Theme[]> {
        return await this.themeRepository.find();
    }

    async findById(id: number): Promise<Theme> {
        let theme = await this.themeRepository.findOne({
            where: { id },
            relations: { postagens: true }
        });

        if (!theme) throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

        return theme;
    }

    async findbyDescription(descricao: string): Promise<Theme[]> {
        return await this.themeRepository.find({
            where: { descricao: ILike(`%${descricao}%`) },
            relations: { postagens: true }
        })
    }

    async create(theme: Theme): Promise<Theme> {
        return await this.themeRepository.save(theme);
    }

    async update(theme: Theme): Promise<Theme> {
        let searchPost = await this.findById(theme.id);

        if (!searchPost || !theme.id) throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

        return await this.themeRepository.save(theme);
    }

    async delete(id: number): Promise<DeleteResult> {
        let searchPost = await this.findById(id);

        if (!searchPost) throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

        return await this.themeRepository.delete(id);
    }

}