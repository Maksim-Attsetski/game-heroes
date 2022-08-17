import styled from 'styled-components';

const StyledFlex = styled.div`
    display: flex;
    justify-content: ${({justify}: any) => justify || 'stretch'};
    align-items: ${({align}: any) => align || 'stretch'};
    flex-direction: ${({direction}: any) => direction || 'row'};
    gap: ${({gap}: any) => gap || '0px'};
    flex-wrap: ${({wrap}: any) => wrap || 'no-wrap'};
    margin: ${({margin}: any) => margin || 0};
`

export const SFlex = (props: any) => <StyledFlex {...props} /> 