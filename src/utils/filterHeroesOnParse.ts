import { IHero } from '../database/HeroClass';
import { heroes } from '../database/heroesDB';

export const filterHeroesOnParse = (heroesId: string[]): IHero[] =>
  heroes.filter((item) =>
    heroesId.length === 2
      ? item.id === heroesId[0] || item.id === heroesId[1] // фильтруем массив со всеми героями и оставляем только те
      : item.id === heroesId[0]
  ); // у которых id такой же
