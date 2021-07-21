import styled from "styled-components";

export const Empty = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 60px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        img {
            max-width: 128px;
            width: 100%;
        }

        strong {
            color: #737380;
            font-size: 24px;
            font-weight: bold;
            font-family: Roboto, sans-serif;
        }
    }
`;
