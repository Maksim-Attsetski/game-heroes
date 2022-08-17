interface IState {
  dark: boolean;
}

const initialState: IState = {
  dark: false,
};

export type themeActionType = 'setTheme' | 'changeTheme';

interface IAction {
  type: themeActionType;
  payload?: boolean;
}

export const themeReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case 'setTheme': {
      return { dark: !!localStorage.getItem('dark') };
    }
    case 'changeTheme': {
      state.dark
        ? localStorage.removeItem('dark')
        : localStorage.setItem('dark', 'dark');
      return { dark: !state.dark };
    }
    default:
      return state;
  }
};
