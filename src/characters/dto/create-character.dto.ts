import { IsNotEmpty } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
