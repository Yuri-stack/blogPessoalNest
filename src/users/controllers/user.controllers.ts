import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";

import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Put('/update')
    @HttpCode(HttpStatus.OK)
    async update(@Body() user: User): Promise<User> {
        return this.userService.update(user);
    }
}