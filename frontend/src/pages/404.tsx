import * as React from 'react';
import { Link } from 'react-router-dom';
import { Heading, SubHeading } from '~/theme/Typography';

import { Container } from '@layout/Container';

export const NotFound = () => (
	<div>
		<Container>
			<Heading>Error 404: Not Found.</Heading>
			<SubHeading>I don't know what you were looking for.</SubHeading>
			<Link to="/">Go home</Link>
		</Container>
	</div>
);
