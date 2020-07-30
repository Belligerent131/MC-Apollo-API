export interface IServerPorperties {
  name: string;
  port: number;
  ipAddress?: string;
  jarFile: string;
  location: string;
  genrateDirectory(): Promise<any>;
}
