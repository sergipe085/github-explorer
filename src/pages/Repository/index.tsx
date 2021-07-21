import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg"

import { Header, RepositoryInfo, Issues, TargetSelector } from "./styles";
import EmptyContainer from "../../components/EmptyContainer";

interface RepositoryParams {
    repository: string;
}

interface RepositoryProps {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

interface Commit {
    sha: string;
    html_url: string;
    commit: {
        message: string;
    },
    author: {
        login: string;
    },
}

const Repository: React.FC = () => {
    const [target, setTarget] = useState<"issues" | "commits">("commits");
    const [repository, setRepository] = useState<RepositoryProps | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {

        async function loadData() {
            const [repository, issues, commits] = await Promise.all([
                api.get(`repos/${params.repository}`),
                api.get(`repos/${params.repository}/issues`),
                api.get(`repos/${params.repository}/commits`)
            ]);

            setCommits(commits.data);
            setRepository(repository.data);
            setIssues(issues.data);

            console.log(commits);
        }

        loadData();
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer"/>
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                </Link>
            </Header>

            {
                repository &&

                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            }

            <TargetSelector>
                <button className={target == "commits" ? "selected" : ""} onClick={() => setTarget("commits")}>Commits</button>
                <button className={target == "issues" ? "selected" : ""} onClick={() => setTarget("issues")}>Issues</button>
            </TargetSelector>

            <Issues>
                {
                    target == "issues" ? (

                        issues.length > 0 ?

                        issues.map((issue) => (
                            <a key={issue.id} href={issue.html_url} target="_blank">
                                <div>
                                    <strong>{ issue.title }</strong>
                                    <p>{ issue.user.login }</p>
                                </div>

                                <FiChevronRight size={20}/>
                            </a>
                        ))

                        :

                        <EmptyContainer title="Nenhuma issue por aqui"/>
                    )
                    :

                    commits.length > 0 ? (
                        commits.map((commit) => (
                            <a key={commit.sha} href={commit.html_url} target="_blank">
                                <div>
                                    <strong>{ commit.commit.message }</strong>
                                    <p>{ commit.author.login }</p>
                                </div>

                                <FiChevronRight size={20}/>
                            </a>
                        ))
                    )

                    :

                    <EmptyContainer title="Nenhum commit por aqui"/>
                }
            </Issues>
        </>
    );
}

export default Repository;
