import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CharacterStatus } from './character-status.enum';
import { Character } from './character.entity';
import { CharacterRepository } from './character.repository';
// import { Character } from "./Character.entity";
// import * as uuid from 'uuid/v1';
import { CreateCharacterDto } from './dto/create-character.dto';
import { GetCharactersFilterDto } from './dto/get-characters-filter.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterRepository)
    private characterRepository: CharacterRepository,
  ) { }

  async getCharacters(filterDto: GetCharactersFilterDto,
    user: User): Promise<Character[]> {
    return this.characterRepository.getCharacters(filterDto, user);
  }

  async getCharacterById(
    id: number,
    user: User): Promise<Character> {
    const found = await this.characterRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Character with ID "${id}" not found`);
    }

    return found;
  }

  async createCharacter(
    createCharacterDto: CreateCharacterDto,
    user: User): Promise<Character> {
    return this.characterRepository.createCharacter(createCharacterDto, user);
  }

  async deleteCharacter(
    id: number,
    user: User): Promise<void> {
    const result = await this.characterRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Character with ID "${id}" not found`);
    }
  }

  async updateCharacterStatus(
    id: number,
    status: CharacterStatus,
    user: User,
  ): Promise<Character> {
    const character = await this.getCharacterById(id, user);
    character.status = status;
    await character.save();
    return character;
  }
}
