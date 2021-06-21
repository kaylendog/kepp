import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Source Sans Pro', sans-serif;
        background: ${(props) => props.theme.background}
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Poppins', sans-serif;
        color: ${(props) => props.theme.colors.primary}
    }
`;
