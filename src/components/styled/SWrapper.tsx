import styled from 'styled-components';

const StyledWrapper = styled.div`
    transition: ${({theme}) => theme.transition};
    backGround-color: ${({theme}) => theme.bg};
    color: ${({theme}) => theme.textColor};
    min-height: 100vh;
    max-width: 100vw;
    overflow: hidden;
    padding: ${(props: any) => props.padding || '0px'}
`

export const SWrapper = (props: any) => <StyledWrapper {...props} />