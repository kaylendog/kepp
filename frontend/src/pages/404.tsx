import * as React from "react";
import { Link } from "react-router-dom";
import { Splash } from "~/layout/default/Splash";
import { Heading, SubHeading } from "~/theme/Typography";

export const NotFound = () => (
	<div>
		<Splash>
			<Heading>Error 404: Not Found.</Heading>
			<SubHeading>I don't know what you were looking for.</SubHeading>
			<Link to="/">Go home</Link>
		</Splash>
	</div>
);
