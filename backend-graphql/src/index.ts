import { WithPrismaServer } from "./prisma-server";

// Define your server class.
// We need to parse in your class type as a parameter to get
// correct return types when calling inline methods.
class MyServer extends WithPrismaServer<MyServer> {}

// Create the server and start listening.
new MyServer({ port: 8080, level: "silly" }).useDefaultMiddleware().listen();
