import * as React from "react";
import { Splash } from "~/layout/default/Splash";
import { Heading, SubHeading } from "~/theme/Typography";

import { Button } from "@theme/Buttons";

export const Landing = () => (
	<div>
		<Splash>
			<Heading>A really over-engineered furry Discord bot.</Heading>
			<SubHeading>
				I don't know why I put this much effort into making this. It does
				everything I could think of.
			</SubHeading>
			<a href={`${process.env.BACKEND_URI}/oauth2/login`}>
				<Button>Add to server</Button>
			</a>
			<Button>Documentation</Button>
		</Splash>
	</div>
);
