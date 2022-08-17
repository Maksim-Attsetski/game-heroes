import { HeroClass, IBaseParam } from './HeroClass';
import archerPhoto from '../assets/img/archer.png';

export class ArcherClass extends HeroClass {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  photo: string;
  constructor(name: string) {
    super();

    this.name = name;
    this.id = `${name}archer`;
    this.role = 'Archer';
    this.baseParams = {
      armor: 4,
      resistance: 6,
      hp: 50,
      power: 43,
      magic: 19,
      attack_speed: 1.5,
    };
    this.photo = archerPhoto;
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
