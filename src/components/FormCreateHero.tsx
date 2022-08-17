import React, {ChangeEvent, FormEvent, useState} from 'react';
import {SInput} from "./styled/SInput";
import {SSelect} from "./styled/SSelect";
import {SButton} from "./styled/SButton";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux";
import {IHero} from "../database/HeroClass";
import {getHero} from "../utils/getHero";
import {SFlex} from "./styled/SFlex";

function FormCreateHero() {
    const dispatch = useTypedDispatch()
    const {allHeroes, userHeroes} = useTypedSelector(state => state.heroes)
    const [formItems, setFormItems] = useState<{
        name: string, role: 'Knight' | 'Archer' | 'Wizard' | 'Monster' | 'Killer' | 'Init'
    }>({
        name: '', role: 'Knight',
    })

    const createNewHero = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userHeroes.length >= 5) return alert('Everybody can use only 5 heroes')

        const nameIsExist: boolean = [...allHeroes, ...userHeroes].some((hero) =>
            hero.name?.toLowerCase() === formItems.name.toLowerCase())
        if (nameIsExist) {
            alert('This name already exist!')
        } else {
        const hero: IHero | null = getHero(formItems.name, formItems.role)

        !hero ? alert('This role is not exist')
            : dispatch({type: 'setUserHeroes', payload: [...userHeroes, hero]})

            setFormItems({name: '', role: 'Knight'})
        }
    }

    return (
        <form onSubmit={createNewHero}>
            <SFlex gap={'40px'}>
                <SInput
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setFormItems({
                        ...formItems,
                        name: event.target.value
                    })}
                    value={formItems.name} type="text" placeholder='name' required
                />

                <SSelect value={formItems.role}
                         onChange={(event: ChangeEvent<HTMLSelectElement>) => setFormItems({
                             ...formItems,
                             // @ts-ignore
                             role: event.target.value
                         })}
                >
                    <option value="Knight">Knight</option>
                    <option value="Wizard">Wizard</option>
                    <option value="Killer">Killer</option>
                    <option value="Archer">Archer</option>
                    <option value="Monster">Monster</option>
                </SSelect>
            </SFlex>
            <br/>
            <SButton>Create</SButton>
        </form>
    );
};

export default FormCreateHero;