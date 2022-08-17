import {STitle} from '../components/styled/STitle';
import FormCreateHero from "../components/FormCreateHero";
import {useTypedSelector} from "../hooks/redux";
import {SFlex} from "../components/styled/SFlex";

function HomePage() {
    const {userHeroes} = useTypedSelector(state => state.heroes)
    return (
        <div>
            <div className="container">
                <br/>
                <STitle textAlign='center'>Homepage</STitle>
                <br/>
                <div>You can made only 5 heroes</div>
                <div>You create ({userHeroes.length}): </div>
                <SFlex gap={'10px'} margin={'10px 0'}>
                    {userHeroes.map((hero) => <div key={hero.id} style={{color: '#5460FE'}}>{hero.name}</div>
                )}</SFlex>
<hr/>
                <br/>
                <div>Let`s create a new hero!</div>
                <br/>

                <FormCreateHero />
            </div>
        </div>
    )
}

export default HomePage;