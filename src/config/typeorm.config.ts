import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgresfist48!',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entitiy.ts'],
  synchronize: true,
}