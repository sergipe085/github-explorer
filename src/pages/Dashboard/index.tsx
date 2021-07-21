import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"
import api from "../../services/api";

import logoImg from "../../assets/logo.svg"

import { Title, Form, Repositories, Error, ClearButton } from "./styles";
import EmptyContainer from "../../components/EmptyContainer";

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState("");
    const [inputError, setInputError] = useState("");
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const repositoriesString = localStorage.getItem("@GithubExplorer:repositories");

        if (repositoriesString) {
            return JSON.parse(repositoriesString)
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("@GithubExplorer:repositories", JSON.stringify(repositories))
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newRepo) {
            setInputError("Digite o autor/nome do reposotorio.");
            return;
        }

        try {
            const response = await api.get<Repository>(`/repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);

            setNewRepo("");
            setInputError("");
        }
        catch (err) {
            setInputError("Erro na busca por esse repositorio. Utilize o formato autor/nome!");
        }
    }

    function handleClear() {
        const clear = window.confirm("Tem certeza que deseja limpar os seus repositorios?");

        if (!clear) return;

        localStorage.setItem("@GithubExplorer:repositories", "");
        setRepositories([]);
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer"></img>
            <Title>Explore repositorios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositorio"
                    value={newRepo}
                    onChange={(event) => setNewRepo(event.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            {


                <Repositories>
                    {
                        repositories.length > 0 ?
                        repositories.map(repository => (
                            <Link to={`/repositories/${repository.full_name}`} key={repository.full_name}>
                                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                                <div>
                                    <strong>{repository.full_name}</strong>
                                    <p>{repository.description}</p>
                                </div>

                                <FiChevronRight size={20}/>
                            </Link>
                        ))

                        :

                        <EmptyContainer title="Nenhum repositorio por aqui"/>
                    }
                </Repositories>

            }



            {
                repositories.length > 0 &&
                <ClearButton onClick={handleClear}>
                    Clear
                </ClearButton>
            }
        </>
    );
}

export default Dashboard;
