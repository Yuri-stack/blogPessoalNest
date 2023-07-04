import { IsNotEmpty } from 'class-validator'
import { Posts } from '../../posts/entities/posts.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity({name: "tb_themes"})
export class Theme{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    descricao: string

    @OneToMany(() => Posts, (posts) => posts.tema)
    postagens: Posts[]
}