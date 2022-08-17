import { HeroClass, IBaseParam } from './HeroClass';
import ninjaPhoto from '../assets/img/ninja.png';

export class KillerClass extends HeroClass {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  photo: string;
  constructor(name: string) {
    super();

    this.name = name;
    this.id = `${name}killer`;
    this.role = 'Killer';
    this.baseParams = {
      armor: 3,
      resistance: 2,
      hp: 50,
      power: 43,
      magic: 19,
      attack_speed: 1.5,
    };
    this.photo = ninjaPhoto;
    this.defense = super.defense;
  }
}
