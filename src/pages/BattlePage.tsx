import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Hero from '../components/Hero';
import {routeNames} from '../components/routes/routeNames';
import {SFlex} from '../components/styled/SFlex';
import {STitle} from '../components/styled/STitle';
import {IHero} from '../database/HeroClass';
import {useTypedDispatch, useTypedSelector} from '../hooks/redux';
import {filterHeroesOnParse} from '../utils/filterHeroesOnParse';
import {SButton} from "../components/styled/SButton";

function BattlePage() {
    const {heroesToBattle, enemyHeroes} = useTypedSelector(state => state.heroes)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [selectedHero, setSelectedHero] = useState<IHero | null>(null)
    const [move, setMove] = useState<'hero' | 'enemy'>('hero')

    useEffect(() => {
        if (heroesToBattle.length === 0) {
            const heroesData = localStorage.getItem('heroesToBattle')
            if (heroesData) {
                const heroes = filterHeroesOnParse(JSON.parse(heroesData)) // если есть герои, то рендерим

                dispatch({type: 'setEnemyHeroes', payload: heroes})
                dispatch({type: 'setHeroesToBattle', payload: heroes})
            } else {
                navigate(routeNames.HEROES) // иначе возвращаемся на страницу со своими героями
            }
        } else {
            dispatch({type: 'setEnemyHeroes', payload: heroesToBattle})
        }
    }, [])

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

                <SFlex gap='20px 40px' justify='space-between' align='center' wrap='wrap'>
                    <div>
                        <div>my heroes</div>
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
                        <div>enemy</div>
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