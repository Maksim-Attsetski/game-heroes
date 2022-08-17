import styled from 'styled-components'


const StyledTitle = styled.div`
    font-size: 30px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: ${({theme}) => theme.textColor};
    text-align: ${({textAlign}: any) => textAlign || 'start'}
`


export const STitle = (props: any) => <StyledTitle {...props} /> 

