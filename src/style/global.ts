import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--neutral-dark-400);
    }
    body{
        font-family: 'Nunito', sans-serif;
    }
    textarea:focus, input:focus, select:focus, input{
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    } 
    button {
        cursor: pointer;
        border: none;
        font-family: 'Nunito', sans-serif;
    }
    ul, li {
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    input {
        font-family: 'Nunito', sans-serif;
    }
    `;
