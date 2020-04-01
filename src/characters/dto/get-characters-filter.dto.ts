import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { CharacterStatus } from "../character-status.enum";

export class GetCharactersFilterDto {
  @IsOptional()
  @IsIn([CharacterStatus.OPEN, CharacterStatus.IN_PROGRESS, CharacterStatus.DONE])
  status: CharacterStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}