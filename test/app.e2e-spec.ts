import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
    let token: any
    let userId: any
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'root',
                    database: 'db_blogpessoal_nest_test',
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: false,
                    dropSchema: true
                }),
                AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

    });

    afterAll(async () => {
        await app.close();
    });

    it('01 - Deve Cadastrar Usuário', async () => {
        const response = await request(app.getHttpServer())
            .post('/users/register')
            .send({
                nome: 'UserTest',
                usuario: 'usertest@gmail.com',
                senha: 'usertest',
                foto: ' '
            })
        expect(201)

        userId = response.body.id
    })

    it('02 - Deve Autenticar Usuário (Login)', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                usuario: 'usertest@gmail.com',
                senha: 'usertest',
            })
        expect(200)

        token = response.body.token;
    })

    it('03 - Não Deve Duplicar o Usuário', async () => {
        return request(app.getHttpServer())
            .post('/users/register')
            .send({
                nome: 'UserTest',
                usuario: 'usertest@gmail.com',
                senha: 'usertest',
                foto: ' '
            })
            .expect(400)
    });

    it('04 - Deve Listar todos os Usuários', async () => {
        return request(app.getHttpServer())
            .get('/users/all')
            .set('Authorization', `${token}`)
            .send({})
            .expect(200)
    });

    it('05 - Deve Atualizar um Usuário', async () => {
        return request(app.getHttpServer())
            .put('/users/update')
            .set('Authorization', `${token}`)
            .send({
                id: userId,
                nome: 'UserTest Atualizado',
                usuario: 'usertest@gmail.com',
                senha: 'usertest',
                foto: ' '
            })
            .expect(200)
            .then(response => {
                expect("UserTest Atualizado").toEqual(response.body.nome);
            });
    });

});
