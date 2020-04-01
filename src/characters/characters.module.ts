import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CharacterRepository } from './character.repository';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterRepository]),
    AuthModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule { }
