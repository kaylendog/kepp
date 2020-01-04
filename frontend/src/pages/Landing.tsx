import * as React from "react";
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

export const Landing = () => (
	<div>
		<Splash>
			<Heading>A really over-engineered furry Discord bot.</Heading>
			<SubHeading>
				I don't know why I put this much effort into making this. It does
				everything I could think of.
			</SubHeading>
			<a href="https://discordapp.com/">
				<Button>Add to server</Button>
			</a>

			<Button>Documentation</Button>
		</Splash>
	</div>
);
