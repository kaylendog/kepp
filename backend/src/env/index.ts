import { dev } from "./dev";
import { prod } from "./prod";

export const env = process.env.NODE_ENV === "production" ? prod : dev;
