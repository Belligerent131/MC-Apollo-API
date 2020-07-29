export interface IServerPorperties {
  name: string;
  port: number;
  ipAddress?: string;
  jarFile: string;
  location: string;
  genrateDirectory(): void;
  setProperties(): void;
  setSpigot(): void;
  setBukket(): void;
  getProperties(): void;
  getSpigot(): void;
  getBukkit(): void;
}
