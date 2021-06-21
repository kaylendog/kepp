import { device } from "kepp-frontend/theme/size";
import Link from "next/link";
import styled from "styled-components";

export const Brand = styled.h1`
	margin: 0;
	font-size: 32px;

	grid-area: 1 / 3 / 1 / 3;
	justify-self: center;
	align-self: center;

	@media ${device.tablet} {
		grid-area: 1 / 1 / 1 / 1;
	}
`;

export const NavigationContainer = styled.div`
	display: none;

	@media ${device.tablet} {
		display: initial;
		grid-area: 1 / 4 / 1 / 4;
		justify-self: end;
		align-self: center;
	}
`;

export const Navigation: React.FC = () => (
	<NavigationContainer>
		<Link href="/">Home</Link>
	</NavigationContainer>
);
