import styled from 'styled-components'

const StyledHeader = styled.header`
    backGround-color: ${({theme}) => theme.blockBG};
    color: ${({theme}) => theme.textColor};
    padding: 20px;
`

export const SHeader = (props: any) => <StyledHeader {...props} />