import { RouteConfig } from "react-router-config";

import { Home } from "./views/home";

export const routes: RouteConfig[] = [{ component: Home, path: "/", exact: true }];
