import { Server } from "./server";

//Load server
const server = new Server()


server.setRoutes()
server.setStaticFolders()
server.setErrorHandlers()
server.startServer()
server.startWebSocket()
