import { IHero } from './../../../heroes/src/database/HeroClass';

export const setFullHp = (userHeroes: IHero[]): IHero[] => {
  return userHeroes.map((hero) => {
    // делаем hp максимальными
    return {
      ...hero,
      baseParams: { ...hero.baseParams, hp: hero.baseParams.max_hp },
    };
  });
};
