import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Heading } from "@theme/Typography";

import { AuthWrapperChildProps, withAuthState } from "../../components/AuthorizeState";

const v = `v${require('~/../package.json').version}`;

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	min-height: 100%;
`;

const Navbar = styled.nav`
	display: grid;
	grid-template: auto / auto 50px auto 50px auto;
	align-items: center;
	justify-items: center;

	padding: 1.5rem;
	margin-bottom: 4rem;
`;

const NavBrand = styled(Heading)`
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	margin: 0;
	font-size: 36px;
`;

const PageContent = styled.div`
	text-align: center;
`;

const Footer = styled.footer`
	margin-top: auto;
	padding: 4rem;
	text-align: center;
	font-size: 18px;
`;

const VersionLink = styled.a`
	color: #aaa;
	transition: all 0.1s;
	text-decoration: none;

	&:hover {
		color: #ffaaff;
		cursor: pointer;
	}
`;

export const DefaultLayoutComponent = (
	props: AuthWrapperChildProps & { children: any }
) => (
	<Layout>
		<Navbar>
			<br></br>
			<VersionLink href="https://github.com/fuzzyfoxie/kepp">{v}</VersionLink>
			<NavBrand>
				<Link to="/" style={{ color: 'white' }}>
					kepp
				</Link>
			</NavBrand>
			<div>
				{(props.authenticated && <Link to="/dashboard">Dashboard</Link>) ||
					(!props.authenticated && (
						<a href={`${process.env.BACKEND_URI}/oauth2/login`}>Log In</a>
					))}
			</div>
		</Navbar>
		<PageContent>{props.children}</PageContent>
		<Footer>
			made with 🧡 by <a href="https://twitter.com/fuzzyfoxie">skye</a> &middot;
			buy me a <a href="https://patreon.com">hot chocolate</a>
		</Footer>
	</Layout>
);

export const DefaultLayout = withAuthState(DefaultLayoutComponent);
