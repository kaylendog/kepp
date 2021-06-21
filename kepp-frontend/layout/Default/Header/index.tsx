import { device } from "kepp-frontend/theme/size";
import styled from "styled-components";

import { Brand, Navigation } from "./navigation";

const StyledHeader = styled.header`
	display: grid;
	height: 4rem;

	grid: 4rem / 4rem auto auto auto 4rem;

	@media ${device.tablet} {
		grid: 4rem / 8rem auto auto;
	}
`;

export const Header = () => (
	<StyledHeader>
		<Brand>kepp</Brand>
		<Navigation></Navigation>
	</StyledHeader>
);
