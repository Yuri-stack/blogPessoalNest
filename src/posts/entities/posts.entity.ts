import { IsNotEmpty } from 'class-validator'
import { Theme } from '../../themes/entities/theme.entity'
import { User } from '../../users/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm'

@Entity({name: "tb_posts"})
export class Posts{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    titulo: string

    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    texto: string

    @UpdateDateColumn()
    data: Date

    @ManyToOne(() => Theme, (theme) => theme.postagens, {
        onDelete: "CASCADE"
    })
    tema: Theme

    @ManyToOne(() => User, (user) => user.postagem, {
        onDelete: "CASCADE"
    })
    usuario: User
}