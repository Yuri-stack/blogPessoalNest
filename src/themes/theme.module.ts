import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Theme } from './entities/theme.entity'
import { ThemeService } from './services/theme.service'
import { ThemeController } from './controllers/theme.controllers'


@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    providers: [ThemeService],
    controllers: [ThemeController],
    exports: [TypeOrmModule]
})

export class ThemeModule { }