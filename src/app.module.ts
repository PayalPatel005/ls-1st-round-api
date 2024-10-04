import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhraseModule } from './phrase/phrase.module';
import { PhraseEntity } from './phrase/phrase.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Replace with MySQL username
      password: 'mysql_password', // Replace with MySQL password
      database: 'ls_api_db',
      entities: [PhraseEntity],
      synchronize: true,
    }),
    PhraseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
