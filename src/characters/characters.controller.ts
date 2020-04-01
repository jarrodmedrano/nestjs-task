import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CharacterStatus } from './character-status.enum';
import { Character } from './character.entity';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { GetCharactersFilterDto } from './dto/get-characters-filter.dto';
import { CharacterStatusValidationPipe } from './pipes/Character-status-validation.pipe';

@Controller('Characters')
@UseGuards(AuthGuard())
export class CharactersController {
  private logger = new Logger('CharactersController');
  constructor(private charactersService: CharactersService) { }

  @Get()
  getCharacters(
    @Query(ValidationPipe) filterDto: GetCharactersFilterDto,
    @GetUser() user: User,
  ): Promise<Character[]> {
    this.logger.verbose(`User "${user.username}" retrieving all Characters. Filters: ${JSON.stringify(filterDto)}`)
    return this.charactersService.getCharacters(filterDto, user);
  }

  @Get('/:id')
  getCharacterById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<Character> {
    return this.charactersService.getCharacterById(id, user);
  }

  @Delete('/:id')
  deleteCharacter(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<void> {
    return this.charactersService.deleteCharacter(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCharacter(
    @Body() createCharacterDto: CreateCharacterDto,
    @GetUser() user: User,
  ): Promise<Character> {
    this.logger.verbose(`User "${user.username}" creating a new Character. Data: ${JSON.stringify(createCharacterDto)}`)
    return this.charactersService.createCharacter(createCharacterDto, user);
  }

  @Patch('/:id/status')
  updateCharacterStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CharacterStatusValidationPipe) status: CharacterStatus,
    @GetUser() user: User,
  ): Promise<Character> {
    return this.charactersService.updateCharacterStatus(id, status, user);
  }
}
