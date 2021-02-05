import React from 'react';

import { Container, Label } from './styles';

export default function Card() {
    return (
        <Container>
            <header>
                <Label color="#7159c1" />
            </header>
            <p>Fazer a migração completa de servidor</p>
            <img src="https://avatars.githubusercontent.com/u/1902749?s=460&u=382acdf7478c6499d9b4321e68523d17b699e802&v=4" alt="" />
        </Container>
    );
}
