import { ArcherClass } from './ArcherClass';
import { IHero } from './HeroClass';
import { KillerClass } from './KillerClass';
import { KnightClass } from './KnightClass';
import { MonsterClass } from './MonsterClass';
import { WizardClass } from './WizardClass';

const knightBot1 = new KnightClass('Bot_1');
const knightBot2 = new KnightClass('Bot_2');

const killerBot3 = new KillerClass('Bot_3');
const killerBot4 = new KillerClass('Bot_4');

const archerBot5 = new ArcherClass('Bot_5');
const archerBot6 = new ArcherClass('Bot_6');

const wizardBot7 = new WizardClass('Bot_7');
const wizardBot8 = new WizardClass('Bot_8');

const monsterBot9 = new MonsterClass('Bot_9');
const monsterBot10 = new MonsterClass('Bot_10');

export const heroes: IHero[] = [
  knightBot1,
  knightBot2,
  killerBot3,
  killerBot4,
  archerBot5,
  archerBot6,
  wizardBot7,
  wizardBot8,
  monsterBot9,
  monsterBot10,
];
