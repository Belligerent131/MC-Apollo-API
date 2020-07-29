import { IServerPorperties } from './ServerInterfaces';
//import { copy, mkdir } from 'fs-extra';
import path from 'path';
import { exists, removeSync, mkdirSync, copy } from 'fs-extra';

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
  genrateDirectory(): void {
    exists(this.location, (doesExist) => {
      if (doesExist) {
        removeSync(this.location);
        mkdirSync(this.location);
        copy(
          path.resolve(this.location, '../server.jar'),
          this.location + '/' + this.jarFile
        );
        copy(
          path.resolve(this.location, '../eula.txt'),
          this.location + '/eula.txt'
        );
        copy(
          path.resolve(this.location, '../server.properties'),
          this.location + '/server.properties'
        );
        copy(
          path.resolve(this.location, '../spigot.yml'),
          this.location + '/spigot.yml'
        );
      } else {
        mkdirSync(this.location);
        copy(
          path.resolve(this.location, '../server.jar'),
          this.location + '/' + this.jarFile
        );
        copy(
          path.resolve(this.location, '../eula.txt'),
          this.location + '/eula.txt'
        );
        copy(
          path.resolve(this.location, '../server.properties'),
          this.location + '/server.properties'
        );
        copy(
          path.resolve(this.location, '../spigot.yml'),
          this.location + '/spigot.yml'
        );
      }
    });
  }

  setProperties(): void {
    throw new Error('Method not implemented.');
  }
  setSpigot(): void {
    throw new Error('Method not implemented.');
  }
  setBukket(): void {
    throw new Error('Method not implemented.');
  }
  getProperties(): void {
    throw new Error('Method not implemented.');
  }
  getSpigot(): void {
    throw new Error('Method not implemented.');
  }
  getBukkit(): void {
    throw new Error('Method not implemented.');
  }
}

export default ConstructServer;
