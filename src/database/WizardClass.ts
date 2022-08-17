import { HeroClass, IBaseParam } from './HeroClass';
import wizardPhoto from '../assets/img/wizard.png';

export class WizardClass extends HeroClass {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  photo: string;
  constructor(name: string) {
    super();

    this.name = name;
    this.id = `${name}wizard`;
    this.role = 'Wizard';
    this.baseParams = {
      armor: 2,
      resistance: 2,
      hp: 55,
      max_hp: 55,
      power: 19,
      magic: 45,
      attack_speed: 1.5,
    };
    this.photo = wizardPhoto;
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
