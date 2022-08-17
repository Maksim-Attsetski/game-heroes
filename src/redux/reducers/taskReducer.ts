import { ITask, tasks } from '../../database/tasksDB';

interface IState {
  allTasks: ITask[];
  dailyTasks: ITask[];
}

const initialState: IState = {
  allTasks: tasks,
  dailyTasks: [],
};

export interface ITaskAction {
  type: 'setDailyTasks';
  payload?: any;
}

const setLastOnline = (date: any, tasks: ITask[]) => {
  localStorage.setItem(
    'lastOnlineDate',
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  );
  localStorage.setItem('dailyTasks', JSON.stringify(tasks));
};

export const taskReducer = (
  state: IState = initialState,
  action: ITaskAction
): IState => {
  switch (action.type) {
    case 'setDailyTasks': {
      const date = new Date();
      const lastOnlineDate = localStorage.getItem('lastOnlineDate');
      const shuffledTasks: ITask[] = state.allTasks.sort(
        () => Math.random() - 0.5
      );
      shuffledTasks.length = 3;

      if (lastOnlineDate) {
        const lastDate = new Date(lastOnlineDate);
        const dailyTasksData = localStorage.getItem('dailyTasks');
        const dailyTasks = dailyTasksData
          ? JSON.parse(dailyTasksData)
          : shuffledTasks;

        if (
          date.getFullYear() > lastDate.getFullYear() ||
          date.getMonth() > lastDate.getMonth() ||
          date.getDate() > lastDate.getDate()
        ) {
          setLastOnline(date, shuffledTasks);
          return { ...state, dailyTasks: shuffledTasks };
        } else {
          return { ...state, dailyTasks };
        }
      } else {
        setLastOnline(date, shuffledTasks);
        return { ...state, dailyTasks: shuffledTasks };
      }
    }
    default:
      return state;
  }
};
