import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Hero from '../components/Hero';
import {routeNames} from '../components/routes/routeNames';
import {SFlex} from '../components/styled/SFlex';
import {STitle} from '../components/styled/STitle';
import {IHero} from '../database/HeroClass';
import {useTypedDispatch, useTypedSelector} from '../hooks/redux';
import {filterHeroesOnParse} from '../utils/filterHeroesOnParse';

function BattlePage() {
    const {heroesToBattle, enemyHeroes, userHeroes} = useTypedSelector(state => state.heroes)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [selectedHero, setSelectedHero] = useState<IHero | null>(null)
    const [move, setMove] = useState<'hero' | 'enemy'>('hero')

    useEffect(() => {
        if (userHeroes.length === 0) return

        if (heroesToBattle.length === 0) {
            const heroesData = localStorage.getItem('heroesToBattle')
            if (heroesData) {
                const heroes = filterHeroesOnParse(userHeroes, JSON.parse(heroesData)) // если есть герои, то рендерим

                heroes.forEach((hero) => {
                    if (hero.defense === undefined) {
                      hero.defense = function (physical: number, magical: number): void {
                        const damage =
                          physical / this.baseParams.armor +
                          magical / this.baseParams.resistance;
                        this.baseParams.hp = +(this.baseParams.hp - damage).toFixed(1);
                        if (this.baseParams.hp <= 0) {
                          this.isDead = true;
                        }
                      };
                    }
                });

                dispatch({type: 'setEnemyHeroes', payload: heroes})
                dispatch({type: 'setHeroesToBattle', payload: heroes})
            } else {
                navigate(routeNames.HEROES) // иначе возвращаемся на страницу со своими героями
            }
        } else {            
            dispatch({type: 'setHeroesToBattle', payload: heroesToBattle})
            dispatch({type: 'setEnemyHeroes', payload: heroesToBattle})
        }
    }, [userHeroes])  

    const onHeroClick = (hero: IHero) => {
        if (move === 'hero') {
            setSelectedHero(hero);
        } else {
            if (selectedHero && selectedHero.isDead) return
            setMove('enemy')
            attack(hero);
        }
    }

    const onEnemyClick = (enemy: IHero) => {
        if (move === 'enemy') {
            setSelectedHero(enemy);
        } else {
            if (selectedHero && selectedHero.isDead) return
            setMove('hero')
            attack(enemy);
        }
    }

    const attack = (unit: IHero) => {
        if (!selectedHero) return
        const {power, magic} = selectedHero.baseParams

        if (unit.isDead) {
            alert(`${unit.name} умер`);
            return;
        }
        unit.defense(power, magic)

        setSelectedHero(unit)
        setMove(prev => prev === 'enemy' ? 'hero' : 'enemy')
    }

    return (
        <div>
            <div className="container">
                <br/>
                <STitle>BattlePage</STitle>
                <br/>
                <div>Which move? – {move}</div>
                <br/><br/>

                <SFlex gap='20px 40px' align='center' wrap='wrap' justify='space-around'>
                    <div>
                        <h4 style={{textAlign: 'center'}}>My heroes</h4>
                        <br/>
                        <SFlex gap='20px 40px' wrap='wrap' direction='column'>
                            {heroesToBattle.map((hero) =>
                                <div key={hero.id} onClick={() => onHeroClick(hero)}
                                     style={{
                                         border: (selectedHero && selectedHero.id === hero.id)
                                             ? '1px solid red'
                                             : '1px solid black',
                                         padding: 20, borderRadius: 20,
                                     }}
                                >
                                    <Hero hero={hero} inBattle/>
                                </div>
                            )}
                        </SFlex>
                    </div>

                    <div>
                        <h4 style={{textAlign: 'center'}}>Enemy</h4>
                        <br/>
                        <SFlex gap='20px 40px' wrap='wrap' direction='column'>
                            {enemyHeroes.map((hero) =>
                                <div key={hero.id} onClick={() => onEnemyClick(hero)}
                                     style={{
                                         border: (selectedHero && selectedHero.id === hero.id)
                                             ? '1px solid red'
                                             : '1px solid black',
                                         padding: 20, borderRadius: 20,
                                     }}
                                >
                                    <Hero hero={hero} inBattle enemy/>
                                </div>)}
                        </SFlex>
                    </div>
                </SFlex>
            </div>
        </div>
    )
}

export default BattlePage;