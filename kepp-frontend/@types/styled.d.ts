import "styled-components";

import { Theme } from "kepp-frontend/theme/types";

declare module "styled-components" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
