import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Label } from './styles';

export default function Card({ data, index }) {
    const ref = useRef();

    const [{ isDragging }, dragRef] = useDrag({
       item:{ type: 'CARD', index },
       collect: monitor => ({
           isDragging: monitor.isDragging(),
       }),
    });

    const [,dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedIndex = item.index;
            const targetIndex = index;

            if(draggedIndex === targetIndex) {
                return;
            }

            //Calculando o meio do card
            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            //Calculando a distancia do card para o topo da tela
            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            //Evitando que o seja necessario fazer uma ação ate o card atingir o meio do card de baixo.
            if(draggedIndex < targetIndex && draggedTop < targetCenter) {
                return;
            }
            //Evitando que o seja necessario fazer uma ação ate o card atingin o meio do card de de cima.
            if(draggedIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }


        }
    });

    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels.map(label => <Label key={label} color={label} />)}
            </header>
            <p>{data.content}</p>
            {data.user && <img src={data.user} alt=""/>}
        </Container>
    );
}
