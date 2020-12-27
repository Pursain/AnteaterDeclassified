import React from 'react'
import styled from 'styled-components';

const CardStyled = styled.div`
    height: 100%;
    // width: 100%;
    border-radius: 15px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 15px;
    background-color: gray;
`;

export default function Card({children}) {
    return (
        <CardStyled>
            {children}
        </CardStyled>
    )
}
