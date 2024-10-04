import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEnum } from 'class-validator';

enum Status {
  Active = 'active',
  Pending = 'pending',
  Spam = 'spam',
  Deleted = 'deleted',
}

@Entity()
export class PhraseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phrase: string;

  @Column()
  @IsEnum(Status)
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('json', { nullable: true })
  translations: { [key: string]: string };
}
