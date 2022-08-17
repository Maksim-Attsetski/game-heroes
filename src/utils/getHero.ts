import { IHero } from '../database/HeroClass';
import { KnightClass } from '../database/KnightClass';
import { KillerClass } from '../database/KillerClass';
import { ArcherClass } from '../database/ArcherClass';
import { WizardClass } from '../database/WizardClass';
import { MonsterClass } from '../database/MonsterClass';

interface IGetHero {
  (
    name: string,
    role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init'
  ): IHero | null;
}

export const getHero: IGetHero = (name, role) => {
  switch (role) {
    case 'Knight': {
      return new KnightClass(name);
    }
    case 'Killer': {
      return new KillerClass(name);
    }
    case 'Archer': {
      return new ArcherClass(name);
    }
    case 'Wizard': {
      return new WizardClass(name);
    }
    case 'Monster': {
      return new MonsterClass(name);
    }
    default:
      return null;
  }
};
