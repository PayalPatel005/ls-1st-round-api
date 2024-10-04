import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PhraseEntity } from './phrase.entity';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(PhraseEntity)
    private readonly phraseRepository: Repository<PhraseEntity>,
  ) {}

  async findOne(id: number): Promise<PhraseEntity> {
    return this.phraseRepository.findOne({
      where: { id },
      select: ['id', 'phrase', 'status', 'createdAt', 'updatedAt'],
    });
  }

  async findTranslation(id: number, language: string): Promise<string> {
    const phrase = await this.phraseRepository.findOne({ where: { id } });
    return phrase?.translations[language] || null;
  }

  async search(query: string, sortBy: string = 'createdAt', sortDir: 'ASC' | 'DESC' = 'ASC', status?: string): Promise<PhraseEntity[]> {
    const whereClause: any = { phrase: Like(`%${query}%`) };
    if (status) whereClause.status = status;

    return this.phraseRepository.find({
      where: whereClause,
      order: { [sortBy]: sortDir },
    });
  }

  async remove(id: number): Promise<void> {
    const phrase = await this.phraseRepository.findOne({ where: { id } });
    if (!phrase) {
      throw new NotFoundException(`Phrase with ID ${id} not found`);
    }
    await this.phraseRepository.delete(id);
  }
}
