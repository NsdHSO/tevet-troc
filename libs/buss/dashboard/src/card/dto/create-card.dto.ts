import { CardEntity } from '@app/models';

export interface CreateCardDto extends Partial<Omit<CardEntity, 'id'>> {
  dashboardName: string;
}
