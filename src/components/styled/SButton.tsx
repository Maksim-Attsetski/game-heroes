import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    backGround-color: ${({theme}) => theme.brandColor};
    cursor: pointer;
    letter-spacing: 1px;
    color: #fff;
    transition: all linear ${({theme}) => theme.transition}

    &:active {
        transform: translateY(3px);
    }
`

export const SButton = (props: any) => <StyledButton {...props} />