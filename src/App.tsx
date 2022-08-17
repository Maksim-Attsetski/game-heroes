import { useEffect, useMemo } from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import AllRoute from './components/routes/AllRoute';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import { getTheme } from './utils/getTheme';

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: Cinzel, sans-serif;
    font-size: 16px;
}
.container {
    max-width: clamp(300px, 90vw, 1100px);
    margin: 0 auto;
}
a {
    color: inherit;
    text-decoration: none;
}
ul {
    list-style: none;
}
:focus {
  outline: none;
}
`

function App () {
    const {dark} = useTypedSelector(state => state.theme)
    const dispatch = useTypedDispatch()

    useEffect(() => { dispatch({type: 'setTheme'}) }, [])
    const theme = useMemo(() => getTheme(dark), [dark])

    return (
        <ThemeProvider theme={theme}>
            <Global />
            <AllRoute />
        </ThemeProvider>
    )
}
export default App;