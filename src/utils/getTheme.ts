interface ITheme {
  textColor: string;
  bg: string;
  blockBG: string;
  transition: string;
  brandColor: string;
}

export const getTheme = (dark: boolean): ITheme => ({
  textColor: dark ? '#fff' : '#111942',
  bg: dark ? '#222' : '#e9e9e9',
  blockBG: dark ? '#111' : '#fff',
  transition: '0.2s',
  brandColor: '#5460FE',
});
