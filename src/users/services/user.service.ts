import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(user: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { usuario: user }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            relations: { postagem: true }
        });
    }

    async findById(id: number): Promise<User> {
        let user = await this.userRepository.findOne({
            where: { id },
            relations: { postagem: true }
        });

        if (!user) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        return user;
    }

    async create(user: User): Promise<User> {
        let searchUser = await this.findByUser(user.usuario);

        if (!searchUser) {
            user.senha = await this.bcrypt.encryptPassword(user.senha)
            return await this.userRepository.save(user);
        }

        throw new HttpException("O Usuário ja existe", HttpStatus.BAD_REQUEST);
    }

    async update(user: User): Promise<User> {
        let updateUser: User = await this.findById(user.id);
        let searchUser = await this.findByUser(user.usuario);

        if (!updateUser)
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        if (searchUser && searchUser.id !== user.id)
            throw new HttpException('Usuário (e-mail) já cadastrado!', HttpStatus.BAD_REQUEST);

        user.senha = await this.bcrypt.encryptPassword(user.senha)
        return await this.userRepository.save(user);
    }
}