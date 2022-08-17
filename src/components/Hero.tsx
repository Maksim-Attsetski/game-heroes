import {IHero} from '../database/HeroClass';
import {SFlex} from './styled/SFlex';
import {SButton} from "./styled/SButton";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux";

interface IProps {
    hero: IHero,
    enemy?: boolean,
    inBattle?: boolean,
}

function Hero({hero, enemy, inBattle}: IProps) {
    const dispatch = useTypedDispatch()
    const {userHeroes} = useTypedSelector(state => state.heroes)

    const removeHero = (event: MouseEvent, userHero: IHero) => {
        event.stopPropagation()

        dispatch({
            type: 'setUserHeroes', payload: [
                ...userHeroes.filter((item) => item.id !== userHero.id)
            ]
        })
    }


    return (
        <SFlex gap='20px 40px' align='center'>
            <SFlex gap='10px' direction='column' align={'center'}>
                <div>{hero.name ? hero.name : 'Anon'}</div>
                <hr style={{width: '100%'}}/>
                <div>{hero.role}</div>

                {!inBattle && <>
                    <hr style={{width: '100%'}}/>
                    <SButton onClick={(event: MouseEvent) => removeHero(event, hero)}>Delete</SButton>
                </>}
            </SFlex>
            <div>
                <div>HP: {hero.baseParams.hp}</div>
                <div>Armor: {hero.baseParams.armor}</div>
                <div>Resistance: {hero.baseParams.resistance}</div>
                <div>Magic: {hero.baseParams.magic}</div>
                <div>Power: {hero.baseParams.power}</div>
                <div>Attack speed: {hero.baseParams.attack_speed}</div>
            </div>
            <img width={100} src={hero.photo} alt={`${hero.name}${hero.role}`}
                 style={{transform: enemy ? 'rotateY(180deg)' : 'rotateY(0deg)'}}
            />
        </SFlex>
    )
}

export default Hero;