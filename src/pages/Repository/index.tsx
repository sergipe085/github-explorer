import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import logoImg from "../../assets/logo.svg"

import { Header, RepositoryInfo, Issues } from "./styles";

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer"/>
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="https://github.com/serjolas1.png" alt="Serjolas1"/>
                    <div>
                        <strong>serjolas1/letmeask</strong>
                        <p>Descricao</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1808</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to={`asdasd`}>
                    <div>
                        <strong>asdasdas</strong>
                        <p>asdasdasdsad</p>
                    </div>

                    <FiChevronRight size={20}/>
                </Link>
            </Issues>
        </>
    );
}

export default Repository;
