import styled from 'styled-components';
import { device } from '~/theme';

export const Container = styled.div`
	margin: 0 auto;
	padding: 0 1rem;
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
