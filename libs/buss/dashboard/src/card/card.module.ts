import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '@app/models';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
