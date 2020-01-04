import { createGlobalStyle, DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
	colors: {
		main: "#261b2b",
		secondary: "",

		link: "#fff",
		linkBackground: "#261b2b",
		linkBackgroundActive: "#44324d",

		background: "#261b2b"
	}
};

export const GlobalStyle = createGlobalStyle`
	html,body,#app-mount {
		height: 100%;

		font-family: "Lato";
		background-color: ${(props) => props.theme.colors.linkBackground};
		margin: 0;

		color: #fff

		user-select: none;

	}
`;

const size = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopL: "1440px",
	desktop: "2560px"
};

export const device = {
	mobileS: `(min-width: ${size.mobileS})`,
	mobileM: `(min-width: ${size.mobileM})`,
	mobileL: `(min-width: ${size.mobileL})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`
};
