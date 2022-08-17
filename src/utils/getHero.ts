import { IHero } from "../database/HeroClass"
import {KnightClass} from "../database/KnightClass";
import {KillerClass} from "../database/KillerClass";
import {ArcherClass} from "../database/ArcherClass";

interface IGetHero {
    (name: string, role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init'): IHero | null
}

export const getHero: IGetHero = (name, role) => {
    console.log(role)
    switch (role) {
        case 'Knight': {
            return new KnightClass(name)
        }
        case 'Killer': {
            return new KillerClass(name)
        }
        case 'Archer': {
            return new ArcherClass(name)
        }
        default: return null
    }
}