import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    backGround-color: ${({theme}) => theme.blockBG};
    letter-spacing: 1px;
    color: ${({theme}) => theme.textColor};
    transition: all linear ${({theme}) => theme.transition};
`

export const SInput = (props: any) => <StyledInput {...props} />