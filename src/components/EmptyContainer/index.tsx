import React, { ReactNode } from "react"

import { Empty } from "./styles";

import iconImg from "../../assets/icon.svg";

interface EmptyContainerProps {
    title: string;
}

function EmptyContainer({title}: EmptyContainerProps) {
    return (
        <Empty>
            <div>
                <img src={iconImg} alt="Imagem Vazia"/>
                <strong>{title}</strong>
            </div>
        </Empty>
    );
}

export default EmptyContainer
