import React from "react";
import { FiChevronRight } from "react-icons/fi"

import logoImg from "../../assets/logo.svg"

import { Title, Form, Repositories } from "./styles";

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer"></img>
            <Title>Explore repositorios no Github</Title>

            <Form>
                <input placeholder="Digite o nome do repositorio"/>
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img src="https://github.com/serjolas1.png" alt="Serjolas1"/>
                    <div>
                        <strong>serjolas1/letmeask</strong>
                        <p>Letmeask é perfeito para pessoas poderem criar salas de pergunta e resposta com o seu público, de uma forma muito organizada e democrática.</p>
                    </div>

                    <FiChevronRight size={60}/>
                </a>
                <a href="teste">
                    <img src="https://github.com/serjolas1.png" alt="Serjolas1"/>
                    <div>
                        <strong>serjolas1/letmeask</strong>
                        <p>Letmeask é perfeito para pessoas poderem criar salas de pergunta e resposta com o seu público, de uma forma muito organizada e democrática.</p>
                    </div>

                    <FiChevronRight size={60}/>
                </a>
                <a href="teste">
                    <img src="https://github.com/serjolas1.png" alt="Serjolas1"/>
                    <div>
                        <strong>serjolas1/letmeask</strong>
                        <p>Letmeask é perfeito para pessoas poderem criar salas de pergunta e resposta com o seu público, de uma forma muito organizada e democrática.</p>
                    </div>

                    <FiChevronRight size={60}/>
                </a>
            </Repositories>
        </>
    );
}

export default Dashboard;
