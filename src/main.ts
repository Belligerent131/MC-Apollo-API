import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './type-defs';
import { enviroment } from './enviroment';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: enviroment.apollo.introspection,
  playground: enviroment.apollo.playground,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
