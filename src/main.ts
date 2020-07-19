import { ApolloServer } from 'apollo-server';

import { graphModules } from './models';
import { enviroment } from './enviroment';

const { schema, context } = graphModules;

const server = new ApolloServer({
  schema,
  context,
  introspection: enviroment.apollo.introspection,
  playground: enviroment.apollo.playground,
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
