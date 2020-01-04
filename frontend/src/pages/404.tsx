import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { device } from "@theme/.";
import { Button, ButtonLink } from "@theme/Buttons";

import { Heading, SubHeading } from "../theme/Typography";

const Splash = styled.div`
	margin: 0 auto;
	max-width: 400px;

	@media ${device.tablet} {
		max-width: 600px;
	}

	@media ${device.laptop} {
		max-width: 800px;
	}

	@media ${device.desktop} {
		max-width: 1400px;
	}
`;

export const NotFound = () => (
	<div>
		<Splash>
			<Heading>Error 404: Not Found.</Heading>
			<SubHeading>I don't know what you were looking for.</SubHeading>
			<Link to="/">Go home</Link>
		</Splash>
	</div>
);
