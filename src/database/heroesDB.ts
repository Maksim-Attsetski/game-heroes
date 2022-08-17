import { ArcherClass } from './ArcherClass';
import { IHero } from './HeroClass';
import { KillerClass } from './KillerClass';
import { KnightClass } from './KnightClass';

const knightMax = new KnightClass('Maxim');
const knightRoman = new KnightClass('Roman');

const killerOlga = new KillerClass('Olga');
const killerNikita = new KillerClass('Nikita');
const killerAsya = new KillerClass('Asya');

const archerStas = new ArcherClass('Stas');
const archerKolya = new ArcherClass('Kolya');

export const heroes: IHero[] = [
  knightMax,
  killerOlga,
  knightRoman,
  killerNikita,
  killerAsya,
  archerStas,
  archerKolya,
];
