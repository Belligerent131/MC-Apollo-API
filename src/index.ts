import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { McServerResolver } from './resolvers/McServerResolver';
import { UserResolver } from './resolvers/UserResolver';
// import ConstructServer from './ServerManagement/ConstructServer';

(async () => {
  try {
    // var minecraftServerProcess = spawn(
    //   'java',
    //   ['-Xmx512M', '-Xms256M', '-jar', 'server.jar', 'nogiu'],
    //   { cwd: 'Pool' }
    // );

    // function log(data: any) {
    //   process.stdout.write(data.toString());
    // }

    // minecraftServerProcess.stdout.on('data', log);
    // minecraftServerProcess.stderr.on('data', log);

    const app = express();
    //var newServer = new ConstructServer('test123', 4454, 'test.jar', 'test123');
    //await newServer.genrateDirectory();

    const options = await getConnectionOptions(
      process.env.NODE_ENV || 'development'
    );
    await createConnection({ ...options, name: 'default' });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [McServerResolver, UserResolver],
        validate: true,
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}/graphql`);
    });
  } catch (e) {
    console.log(e);
  }
})();
