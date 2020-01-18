import * as React from 'react';
import Select from 'react-select';
import { Container } from '~/layout/Container';
import { Heading } from '~/theme/Typography';

export const Dashboard = () => (
	<Container>
		<Heading>Select a server</Heading>
		<Select isDisabled={true} isLoading={true} />
	</Container>
);
