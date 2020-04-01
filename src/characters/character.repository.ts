import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from "typeorm";
import { User } from '../auth/user.entity';
import { CharacterStatus } from "./character-status.enum";
import { Character } from "./character.entity";
import { CreateCharacterDto } from './dto/create-character.dto';
import { GetCharactersFilterDto } from './dto/get-characters-filter.dto';

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {
  private logger = new Logger('CharacterRepository');

  async getCharacters(
    filterDto: GetCharactersFilterDto,
    user: User): Promise<Character[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('Character');

    query.where('Character.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('Character.status = :status', { status });
    }

    if (search) {
      query.andWhere('(Character.title LIKE :search OR Character.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const Characters = await query.getMany();
      return Characters;
    } catch (error) {
      this.logger.error(`Failed to get Characters for user "${user.username}" Filters: ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException();
    }

  }

  async createCharacter(
    createCharacterDto: CreateCharacterDto,
    user: User): Promise<Character> {
    const { title, description } = createCharacterDto;

    const character = new Character();
    character.title = title;
    character.description = description;
    character.status = CharacterStatus.OPEN;
    character.user = user;
    await character.save();

    try {
      await character.save();
    } catch (error) {
      this.logger.error(`Failed to create Character for user "${user.username}" Data: ${JSON.stringify(createCharacterDto)}`, error.stack)
      throw new InternalServerErrorException();
    }

    delete character.user;

    return character;
  }
}