import styled from "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			main: "#261b2b";
			secondary: "";

			link: "#fff";
			linkBackground: "#261b2b";
			linkBackgroundActive: "#44324d";

			background: "#261b2b";
		};
	}
}
