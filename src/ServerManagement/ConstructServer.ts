import { IServerPorperties } from './ServerInterfaces';
import path from 'path';
import { existsSync, remove, copy, rename } from 'fs-extra';

class ConstructServer implements IServerPorperties {
  name: string;
  port: number;
  ipAddress?: string | undefined;
  jarFile: string;
  location: string;

  constructor(
    name: string,
    port: number,
    jarFile: string,
    location: string,
    ipAddress?: string
  ) {
    this.name = name;
    this.port = port;
    this.jarFile = jarFile;
    this.location = path.resolve(__dirname, '../../../Pool/' + location);
    if (ipAddress) {
      this.ipAddress = ipAddress;
    } else {
      this.ipAddress = '127.0.0.1';
    }
  }

  // Return - Void
  // Checks if the server directory already exists.
  // If it does, the directory will be removed. The function then proceeds
  // to create the directory and copy server.jar and eula.txt to the specified directory
  async genrateDirectory(): Promise<any> {
    var files = await existsSync(this.location);
    if (files) {
      console.log('That directory already exists. Cleaning it up.');
    }
    console.log('Importing a new installation of a Spigot server, hang on!');
    await remove(this.location);
    await copy(path.resolve(this.location, '../Server_Default'), this.location);
    await rename(
      path.resolve(this.location, this.location + '/' + 'server.jar'),
      path.resolve(this.location, this.location + '/' + this.jarFile)
    );
  }
}

export default ConstructServer;
