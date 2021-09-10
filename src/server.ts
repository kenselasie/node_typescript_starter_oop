import express, { Express, Request, Response, NextFunction } from "express";
import * as http from "http"
import cors from 'cors'
import { Server as SocketServer, Socket } from 'socket.io'

import routes from './routes'


export class Server {
  private app: Express;
  private port: any = 3000;
  private httpServer
  private io

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json()); // support json encoded bodies
    this.app.use(express.urlencoded({ extended: true })); // support encoded bodies
    this.port = 3000;
    this.httpServer = http.createServer(this.app)
    this.io = new SocketServer(this.httpServer)
  }

  public setRoutes = () => {
    this.app.use('/', routes);
  }

  public startServer = () => {
    this.httpServer.listen(this.port);
    this.httpServer.on('error', this.onError);
    this.httpServer.on('listening', this.onServerListen);
  }

  public startWebSocket = () => {
    this.io.on('connection', (socket) => this.onWebSocketConnection(socket));
  }

  public onWebSocketConnection = (socket: any) => {
    console.log('a user connected')
  }

  //When hosting a client app such as angular - map the path to the client dist folder
  public setStaticFolders = () => {
    var path = require('path')
    let clientPath = path.join(__dirname, '../frontend');
    console.log(`adding static folder: ${clientPath}`)
    this.app.use(express.static(clientPath));
  }


  private onServerListen = () => {
    console.log('App listening on port ' + this.port);
    console.log("you are running in " + process.env.NODE_ENV + " mode.");
  }

  onError = (err: any) => {
    switch (err.code) {
      case 'EACCES':
        console.error('port requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error('port is already in use');
        process.exit(1);
      default:
        throw err;
    }
  }

  public setErrorHandlers = () => {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status((<any>err).status || 500);
      res.send({
        message: err.message,
        error: err
      });
    });
  }
}