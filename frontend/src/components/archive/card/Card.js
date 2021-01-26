import React from 'react'
import styled from 'styled-components';

const Card = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 15px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 15px;
    background-color: gray;
    overflow-x: hidden;
    overflow-y: hidden;
`;

export default Card;

// export default function Card({children}) {
//     return (
//         <CardStyled>
//             {children}
//         </CardStyled>
//     )
// }