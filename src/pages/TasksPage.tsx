import { STitle } from '../components/styled/STitle';
import Tasks from '../components/Tasks';

function TasksPage () {
    return (
        <div>
            <div className="container">
                <br />
                <STitle textAlign='center'>Tasks page</STitle>
                <br /><br />
                <Tasks />
            </div>
        </div>
    )
}
export default TasksPage;