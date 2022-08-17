import { HeroClass, IBaseParam } from './HeroClass';
import knightPhoto from '../assets/img/knight.png';

export class KnightClass extends HeroClass {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  photo: string;
  constructor(name: string) {
    super();

    this.name = name;
    this.id = `${name}knight`;
    this.role = 'Knight';
    this.baseParams = {
      armor: 8,
      resistance: 7,
      hp: 80,
      power: 10,
      magic: 0,
      attack_speed: 1,
    };
    this.photo = knightPhoto;
    this.defense = super.defense;
  }
}
