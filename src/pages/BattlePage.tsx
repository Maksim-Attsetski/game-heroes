import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Hero from '../components/Hero';
import {routeNames} from '../components/routes/routeNames';
import {SFlex} from '../components/styled/SFlex';
import {STitle} from '../components/styled/STitle';
import {IHero} from '../database/HeroClass';
import {useTypedDispatch, useTypedSelector} from '../hooks/redux';
import {filterHeroesOnParse} from '../utils/filterHeroesOnParse';
import { setHeroDefenseFunc } from '../utils/setHeroDefenseFunc';

function BattlePage() {
    const {heroesToBattle, enemyHeroes, userHeroes} = useTypedSelector(state => state.heroes)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [selectedHero, setSelectedHero] = useState<IHero | null>(null)
    const [move, setMove] = useState<'hero' | 'enemy'>('hero')
    const [win, setWin] = useState<{
        win: boolean, winner: 'hero' | 'enemy' | null
    }>({win: false, winner: null})

    useEffect(() => {
        if (userHeroes.length === 0) return

        if (heroesToBattle.length === 0) {
            const heroesData = localStorage.getItem('heroesToBattle')
            if (heroesData) {
                const heroes = filterHeroesOnParse(userHeroes, JSON.parse(heroesData)) // если есть герои, то рендерим

                const heroesWithDefenseFunc = setHeroDefenseFunc(heroes)

                dispatch({type: 'setEnemyHeroes', payload: heroesWithDefenseFunc})
                dispatch({type: 'setHeroesToBattle', payload: heroesWithDefenseFunc})
            } else {
                navigate(routeNames.HEROES) // иначе возвращаемся на страницу со своими героями
            }
        } else {   
            const heroesWithDefenseFunc = setHeroDefenseFunc(heroesToBattle)
                     
            dispatch({type: 'setHeroesToBattle', payload: heroesWithDefenseFunc})
            dispatch({type: 'setEnemyHeroes', payload: heroesWithDefenseFunc})
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
            return alert(`${unit.name} умер`);
        }
        unit.defense(power, magic)

        const heroesIsDead = userHeroes.every((hero) => hero.isDead) 
        const enemyIsDead = enemyHeroes.every((hero) => hero.isDead) 

        if (heroesIsDead || enemyIsDead) {
            const winner = heroesIsDead ? 'enemy' : 'hero'
            setWin({win: true, winner })

            return alert(`winner: ${winner}`)
        }

        setSelectedHero(unit)
        setMove(prev => prev === 'enemy' ? 'hero' : 'enemy')
    }

    return (
        <div>
            <div className="container">
                {win.win && <SFlex style={{
                    position: 'absolute', top: '15%', left: '40%',
                    border: '1px solid #5460FE', padding: 15, borderRadius: 20,
                }} gap={'10px'} direction='column' align='center'>
                    <div>Winner: {win.winner}</div>
                    <div style={{cursor: 'pointer'}} onClick={() => setWin({win: false, winner: null })}>Close</div>
                </SFlex>}

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