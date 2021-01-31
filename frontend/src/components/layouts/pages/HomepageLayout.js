import React from 'react';

import { Grommet, Main } from 'grommet';

export const HomepageLayout = ({ children }) => (
    <Grommet
        full={true}
    >
        <Main
            justify="center"
            align="center"
        >
            {children}
        </Main>
    </Grommet>
);