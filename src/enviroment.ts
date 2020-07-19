const defaultPort = 4000;

interface Enviroment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
}

export const enviroment: Enviroment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || defaultPort,
};
