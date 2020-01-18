import * as React from "react";
import { Link } from "react-router-dom";
import { Splash } from "~/layout/default/Splash";
import { Heading, SubHeading } from "~/theme/Typography";

import { Button } from "@theme/Buttons";

import { withAuthState } from "../components/withAuthState";

export const Landing = withAuthState((state) => (
	<div>
		<Splash>
			<Heading>A really over-engineered furry Discord bot.</Heading>
			<SubHeading>
				I don't know why I put this much effort into making this. It does
				everything I could think of.
			</SubHeading>
			{(state.authenticated && (
				<Link to="/dashboard">
					<Button>Go to Dashboard</Button>
				</Link>
			)) ||
				(!state.authenticated && (
					<a href={`${process.env.BACKEND_URI}/oauth2/login`}>
						<Button>Add to server</Button>
					</a>
				))}
			<Button>Documentation</Button>
		</Splash>
	</div>
));
