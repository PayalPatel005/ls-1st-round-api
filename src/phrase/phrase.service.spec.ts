import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhraseEntity } from './phrase.entity';
import { NotFoundException } from '@nestjs/common';

// Given data for test
const data = {
  id: 1,
  phrase: "Hi, I'm a phrase",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date(),
  translations: {
    fr: "Salut, je suis une phrase",
    es: "Hola soy una frase",
  },
};

// Test Data Repository
const dataRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

describe('PhraseService', () => {
  let service: PhraseService;
  let repository: Repository<PhraseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhraseService,
        {
          provide: getRepositoryToken(PhraseEntity),
          useValue: dataRepository,
        },
      ],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
    repository = module.get<Repository<PhraseEntity>>(getRepositoryToken(PhraseEntity));
  });

  it('This data should be defined', () => {
    expect(service).toBeDefined();
  });

  // User needs to pass ID to fetch phrase by ID
  describe('Suits for findOne Query', () => {
    it('Test case for reslut needs to return a phrase object', async () => {
      dataRepository.findOne.mockResolvedValue(data);
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        phrase: "Hi, I'm a phrase",
        status: "active",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        translations: {
            fr: "Salut, je suis une phrase",
            es: "Hola soy una frase",
        },
      });
    });
  });

  // User needs to pass ID and language to fetch translated data
  describe('Suits for findTranslation Query', () => {
    it('Test case for result needs to return the translation of a phrase', async () => {
      dataRepository.findOne.mockResolvedValue(data);
      const result = await service.findTranslation(1, 'fr');
      expect(result).toEqual('Salut, je suis une phrase');
    });

    it('Test case will return null if translation does not exist', async () => {
      dataRepository.findOne.mockResolvedValue(data);
      const result = await service.findTranslation(1, 'de');
      expect(result).toBeNull();
    });
  });

  // Test case for searching phrases from data
  describe('Suits for search Query', () => {
    it('This test case should return an array of phrases that match the query', async () => {
      dataRepository.find.mockResolvedValue([data]);
      const result = await service.search('phrase', 'createdAt', 'ASC');
      expect(result).toEqual([data]);
    });

    it('This test case should return an empty array if no matches found', async () => {
      dataRepository.find.mockResolvedValue([]);
      const result = await service.search('nonexistent', 'createdAt', 'ASC');
      expect(result).toEqual([]);
    });
  });

  // Test case to delete a phrase
  describe('Test case to delete a phrase', () => {
    it('Test case for delete a phrase successfully', async () => {
      // Mock the repository findOne and delete methods
      dataRepository.findOne.mockResolvedValue(data);
      dataRepository.delete.mockResolvedValue({});

      // Delete phrase
      await service.remove(1);
      expect(dataRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(dataRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if phrase is not found', async () => {
      // Return null if phrase not found
      dataRepository.findOne.mockResolvedValue(null);

      // Throw NotFoundException if data not found
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
