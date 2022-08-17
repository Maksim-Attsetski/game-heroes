import { NavLink } from 'react-router-dom';
import { useTypedDispatch } from '../hooks/redux';
import { routeNames } from './routes/routeNames';
import { SButton } from './styled/SButton';
import { SFlex } from './styled/SFlex';
import { SHeader } from './styled/SHeader';

function Header () {
    const dispatch = useTypedDispatch()

    return (
        <SHeader>
            <SFlex justify='space-between' align='center' className='container'>
                <SButton onClick={() => dispatch({type: 'changeTheme'})}>Logo</SButton>
                <SFlex gap='10px 20px'>
                    <NavLink to={routeNames.HOME}>Home</NavLink>
                    <NavLink to={routeNames.TASKS}>Tasks</NavLink>
                    <NavLink to={routeNames.HEROES}>Heroes</NavLink>
                </SFlex>
            </SFlex>
        </SHeader>
    )
}
export default Header;