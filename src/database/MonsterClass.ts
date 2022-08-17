import { HeroClass, IBaseParam } from './HeroClass';
import monsterPhoto from '../assets/img/monster.png';

export class MonsterClass extends HeroClass {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  photo: string;
  constructor(name: string) {
    super();

    this.name = name;
    this.id = `${name}monster`;
    this.role = 'Monster';
    this.baseParams = {
      armor: 7,
      resistance: 7,
      hp: 75,
      max_hp: 75,
      power: 17,
      magic: 7,
      attack_speed: 1.5,
    };
    this.photo = monsterPhoto;
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
