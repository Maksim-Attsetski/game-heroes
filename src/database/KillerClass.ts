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
  }

  defense(physical: number, magical: number): void {
    const damage =
      physical / this.baseParams.armor + magical / this.baseParams.resistance;
    this.baseParams.hp = +(this.baseParams.hp - damage).toFixed(1);
    if (this.baseParams.hp <= 0) {
      this.isDead = true;
    }
  }
}
