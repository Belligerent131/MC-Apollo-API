import {
  InputType,
  Field,
  Int,
  Resolver,
  Mutation,
  Arg,
  Query,
} from 'type-graphql';
import dayjs from 'dayjs';
import { McServer } from '../entity/McServer';

// Acts like a interface for Graphql
// Define the input that are available/required
// Question mark ? delimiter specifies nullable types
@InputType()
class McServerInput {
  //Name of the server
  @Field()
  name: string;

  //ipAddress of the server
  @Field()
  ipAddress: string;

  //Number of players active on the server
  @Field(() => Int)
  players: number;

  //Port number associated with the server
  @Field(() => Int)
  port: number;

  //Specifies if the server is alive
  @Field()
  alive?: boolean;

  //Timestamps
  @Field(() => String, { nullable: true })
  timeStamp: string;

  //Referenced name of the Server Jar file
  @Field()
  jarFile: string;

  //Referenced directory of the server Jar file
  @Field()
  directory: string;
}

//Resolvers handle the API calls through Graphql.
//Mutations are used to manipulate data, such as create/update/delete
@Resolver()
export class McServerResolver {
  @Mutation(() => McServer)
  async heartbeat(@Arg('options', () => McServerInput) options: McServerInput) {
    options.timeStamp = dayjs().format();
    const heartbeat = await McServer.create(options).save();
    return heartbeat;
  }

  // Queries deal with data retrieval of GraphQL api handles
  @Query(() => [McServer])
  getServers() {
    return McServer.find();
  }
}
