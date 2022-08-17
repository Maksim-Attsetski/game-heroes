import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Hero from '../components/Hero';
import {routeNames} from '../components/routes/routeNames';
import {SButton} from '../components/styled/SButton';
import {SFlex} from '../components/styled/SFlex';
import {STitle} from '../components/styled/STitle';
import {IHero} from '../database/HeroClass';
import {useTypedDispatch, useTypedSelector} from '../hooks/redux';

function HeroesPage() {
    const {userHeroes} = useTypedSelector(state => state.heroes)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const [limit, setLimit] = useState<number>(0)
    const [selectedHeroes, setSelectedHeroes] = useState<IHero[]>([])

    const onHeroClick = (hero: IHero) => {
        const isExist = selectedHeroes.some((item) => item.id === hero.id)

        if (!isExist) {
            if (limit === 2) {
                alert('limit heroes')
                return
            } else {
                setLimit(prev => prev + 1)
                setSelectedHeroes([...selectedHeroes, hero])
            }
        } else {
            setLimit(prev => prev - 1)
            setSelectedHeroes([...selectedHeroes.filter((item) => item.id !== hero.id)])
        }
    }

    const readyToBattle = () => {
        dispatch({type: 'setHeroesToBattle', payload: selectedHeroes})
        navigate(routeNames.BATTLES)
    }

    return (
        <div>
            <div className="container">
                <br/>
                <STitle textAlign='center'>Heroes page</STitle>
                <br/><br/>

                <div>Your heroes</div>
                <br/>

                <SFlex wrap='wrap' gap='20px 40px' justify='space-around'>
                    {userHeroes.map((hero) =>
                        <div key={hero.id}
                             style={{
                                 border: '1px solid #5460FE', padding: 15,
                                 borderRadius: 20, height: 'max-content',
                                 cursor: 'pointer',
                             }}
                             onClick={() => onHeroClick(hero)}
                        >
                            <Hero hero={hero}/>
                        </div>)}
                </SFlex>

                <br/>
                <hr/>
                <br/>

                <div>Selected heroes ({limit}) :</div>
                <br/>
                {selectedHeroes.length > 0 && <>
                    <SFlex direction='column' gap='10px'>
                        {selectedHeroes.map((hero) => <div key={hero.id}>{hero.name}, {hero.role}</div>)}
                    </SFlex>
                    <br/>
                    <SButton onClick={readyToBattle}>To battle</SButton>
                </>}
            </div>
        </div>
    )
}

export default HeroesPage;