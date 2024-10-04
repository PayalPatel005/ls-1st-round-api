import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhraseEntity } from './phrase.entity';
import { PhraseService } from './phrase.service';
import { PhraseController } from './phrase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhraseEntity])],
  providers: [PhraseService],
  controllers: [PhraseController],
})
export class PhraseModule {}
