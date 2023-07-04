import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Posts } from "../../posts/entities/posts.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_users"})
export class User{

    @PrimaryGeneratedColumn() 
    public id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public nome: string

    @IsEmail()
    @Column({length: 255, nullable: false })
    public usuario: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false }) 
    public senha: string

    @Column({length: 5000 }) 
    public foto: string

    @OneToMany(() => Posts, (post) => post.usuario)
    postagem: Posts[]
}