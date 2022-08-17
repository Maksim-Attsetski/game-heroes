import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { SWrapper } from '../styled/SWrapper';

function Layout () {
    return (
        <SWrapper>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </SWrapper>
    )
}
export default Layout;