import styled from "styled-components";

export const Button = styled.button`
	font-family: "Questrial";
	font-size: 24px;
	margin: 1rem;

	background: none;
	color: white;
	transition: all 0.1s;

	border: 0.1rem solid #5e436a;
	border-radius: 10px;
	padding: 1rem;

	box-shadow: 0 0px 10px 0px #000a;

	cursor: pointer;

	&:hover {
		background: ${(props) => props.theme.colors.linkBackgroundActive};
	}
`;

export const ButtonLink = styled.a`
	font-family: "Questrial";
	font-size: 24px;
	margin: 1rem;

	background: none;
	color: white;

	border: 0.1rem solid #5e436a;
	border-radius: 10px;
	padding: 1rem;

	box-shadow: 0 0px 10px 0px #000a;
`;
