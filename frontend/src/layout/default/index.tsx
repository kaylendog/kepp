import * as React from "react";
import styled from "styled-components";
import DiscordLogo from "~/assets/icons/discord_logo.svg";

import { Heading } from "@theme/Typography";

const v = `v${require("~/../package.json").version}`;

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

export const DefaultLayout = (props: any) => (
	<Layout>
		<Navbar>
			<br></br>
			<VersionLink href="https://github.com/kippfoxx/kepp">
				{v}
			</VersionLink>
			<NavBrand>kepp</NavBrand>
			<div>
				<img src={DiscordLogo} width={48}></img>
			</div>
		</Navbar>
		<PageContent>{props.children}</PageContent>
		<Footer>made with 🧡 by kipp</Footer>
	</Layout>
);
