import { Route, Routes } from 'react-router-dom';
import BattlePage from '../../pages/BattlePage';
import HeroesPage from '../../pages/HeroesPage';
import HomePage from '../../pages/HomePage';
import TasksPage from '../../pages/TasksPage';
import Layout from './Layout';
import { routeNames } from './routeNames';
import {useEffect} from "react";
import {useTypedDispatch} from "../../hooks/redux";

function AllRoute () {
    const {HOME, TASKS, HEROES, BATTLES} = routeNames
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch({type: 'getUserHeroes', payload: []})
    }, [])

    return (
        <Routes>
            <Route path={HOME} element={<Layout/>}>
                <Route path={HOME} element={<HomePage />} />
                <Route path={TASKS} element={<TasksPage/>} />
                <Route path={HEROES} element={<HeroesPage/>} />
                <Route path={BATTLES} element={<BattlePage/>} />
            </Route>
        </Routes>
    )
}
export default AllRoute;