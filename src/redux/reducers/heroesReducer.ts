import { IHero } from '../../database/HeroClass';
import { heroes } from '../../database/heroesDB';
import { filterHeroesOnParse } from '../../utils/filterHeroesOnParse';

interface IState {
  allHeroes: IHero[];
  userHeroes: IHero[];
  heroesToBattle: IHero[];
  enemyHeroes: IHero[];
}

const initialState: IState = {
  allHeroes: heroes,
  userHeroes: [],
  heroesToBattle: [],
  enemyHeroes: [],
};

interface IHeroesAction {
  type:
    | 'getUserHeroes'
    | 'setHeroesToBattle'
    | 'setEnemyHeroes'
    | 'setUserHeroes';
  payload: IHero[];
}

export const heroesReducer = (
  state = initialState,
  action: IHeroesAction
): IState => {
  switch (action.type) {
    case 'setUserHeroes': {
      const userHeroes = [...action.payload];
      localStorage.setItem('userHeroes', JSON.stringify(userHeroes));
      return { ...state, userHeroes };
    }
    case 'getUserHeroes': {
      const userHeroesData: string | null = localStorage.getItem('userHeroes');
      return {
        ...state,
        userHeroes: userHeroesData ? JSON.parse(userHeroesData) : [],
      };
    }
    case 'setHeroesToBattle': {
      const heroesToBattle = [
        ...action.payload.reduce(
          (acc: any, hero: IHero) => [...acc, hero.id],
          []
        ),
      ];

      console.log(action.payload);

      localStorage.setItem('heroesToBattle', JSON.stringify(heroesToBattle));
      localStorage.removeItem('enemy');
      return { ...state, heroesToBattle: action.payload };
    }
    case 'setEnemyHeroes': {
      const allEnemyData = localStorage.getItem('enemy');

      if (allEnemyData) {
        // если есть уже противники, то парсим и фильтруем
        const enemyHeroes = filterHeroesOnParse(
          state.userHeroes,
          JSON.parse(allEnemyData)
        );
        return { ...state, enemyHeroes };
      } else {
        const allEnemy = heroes
          .filter((item) =>
            action.payload.length === 2
              ? item.id !== action.payload[0].id &&
                item.id !== action.payload[1].id // иначе убираем выбранных героев из общего массива
              : item.id !== action.payload[0].id
          )
          .sort(() => Math.random() - 0.5); // перемешиваем

        allEnemy.length = action.payload.length; // оставляем только столько, сколько у нас выбранных героев

        const enemyForLS = allEnemy.reduce(
          (acc: any[], hero: IHero) => [...acc, hero.id],
          []
        );

        localStorage.setItem('enemy', JSON.stringify(enemyForLS)); // т.к. у нас нет противников, то сохраняем этих
        return { ...state, enemyHeroes: allEnemy };
      }
    }
    default:
      return state;
  }
};
