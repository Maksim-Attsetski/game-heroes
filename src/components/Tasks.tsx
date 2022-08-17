import {useEffect} from 'react';
import {useTypedDispatch, useTypedSelector} from '../hooks/redux';
import {SFlex} from './styled/SFlex';

function Tasks() {
    const {dailyTasks} = useTypedSelector(state => state.tasks)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch({type: 'setDailyTasks'})
    }, [])

    return (
        <div>
            <SFlex direction='column' gap={15}>
                {dailyTasks.map((task) =>
                    <SFlex key={task.id} gap={'10px 20px'}>
                        <div>{task.isDone ? 'Done' : 'Not done'}</div>
                        <div>{task.title}</div>
                        <div>{task.reward}</div>
                    </SFlex>
                )}
            </SFlex>
        </div>
    )
}

export default Tasks;