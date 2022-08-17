import styled from 'styled-components';

const StyledSelect = styled.select`
    padding: 5px 10px;
    border: none;
    border-radius: 10px;
    backGround-color: ${({theme}) => theme.blockBG};
    letter-spacing: 1px;
    color: ${({theme}) => theme.textColor};
    transition: all linear ${({theme}) => theme.transition};
`

export const SSelect = (props: any) => <StyledSelect {...props} />