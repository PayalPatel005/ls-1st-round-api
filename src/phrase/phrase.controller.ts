import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhraseService } from './phrase.service';

@Controller('phrase')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  // Returns a phrase object, without translations
  @Get(':id')
  async getPhrase(@Param('id') id: number) {
    return this.phraseService.findOne(id);
  }

  // Returns a translation of a phrase
  @Get(':id/:language')
  async getTranslation(@Param('id') id: number, @Param('language') language: string) {
    return this.phraseService.findTranslation(id, language);
  }

  // Returns any phrase object where the phrase contains this text
  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortDir') sortDir: 'ASC' | 'DESC' = 'ASC',
    @Query('status') status?: string,
  ) {
    return this.phraseService.search(query, sortBy, sortDir, status);
  }
}
