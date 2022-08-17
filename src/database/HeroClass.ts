import knightPhoto from '../assets/img/knight.png';

export interface IHero {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  equipment: null;
  photo: string | typeof knightPhoto;
  isDead: boolean;
  defense: (physical: number, magical: number) => void;
}

export interface IBaseParam {
  hp: number;
  max_hp: number;
  attack_speed: number;
  power: number;
  magic: number;
  armor: number;
  resistance: number;
}

class HeroClass implements IHero {
  name: string | null;
  baseParams: IBaseParam;
  id: string;
  role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init';
  equipment: null;
  photo: string;
  isDead: boolean;

  constructor() {
    this.name = null;
    this.baseParams = {} as IBaseParam;
    this.id = 'hero';
    this.role = 'Init';
    this.equipment = null;
    this.photo = '';
    this.isDead = false;
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

export { HeroClass };
