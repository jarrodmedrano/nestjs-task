import { BadRequestException, PipeTransform } from "@nestjs/common";
import { CharacterStatus } from "../character-status.enum";

export class CharacterStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    CharacterStatus.OPEN,
    CharacterStatus.IN_PROGRESS,
    CharacterStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}