import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../auth/user.entity';
import { CharacterStatus } from "./character-status.enum";

@Entity()
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: CharacterStatus;

  @ManyToOne(type => User, user => user.characters, { eager: false })
  user: User;

  @Column()
  userId: number;
}