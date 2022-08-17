import { IHero } from '../database/HeroClass';

export const setHeroDefenseFunc = (heroes: IHero[]): IHero[] => {
  return heroes.map((hero) => {
    if (hero.defense === undefined) {
      hero.defense = function (physical: number, magical: number): void {
        const damage =
          physical / this.baseParams.armor +
          magical / this.baseParams.resistance;
        this.baseParams.hp = +(this.baseParams.hp - damage).toFixed(1);
        if (this.baseParams.hp <= 0) {
          this.isDead = true;
        }
      };
    }
    return hero;
  });
};
