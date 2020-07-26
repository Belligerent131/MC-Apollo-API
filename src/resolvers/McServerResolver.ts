import { Query, InputType, Field, Int, Mutation, Arg } from 'type-graphql';
import { McServer } from '../entity/McServer';
import { Error } from './shareable';

//Input Types
@InputType()
class McServerInput {
  @Field()
  name: string;

  @Field()
  ipAddress: string;

  @Field()
  jarFile: string;

  @Field()
  directory: string;

  @Field(() => Int)
  port: number;

  @Field(() => Int)
  players: number;

  @Field(() => Boolean, { defaultValue: false })
  alive?: boolean;
}

@InputType()
class McServerUpdate {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  jarFile?: string;

  @Field({ nullable: true })
  directory?: string;

  @Field(() => Int, { nullable: true })
  port?: number;

  @Field(() => Int, { nullable: true })
  players?: number;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  alive?: boolean;
}

export class McServerResolver {
  //Queries
  @Query(() => [McServer!], { nullable: true })
  getServers() {
    return McServer.find();
  }

  //Mutations
  @Mutation(() => [Error!], { nullable: true })
  async createServer(
    @Arg('option', () => McServerInput) options: McServerInput
  ) {
    const portExists = await McServer.findOne({
      where: { port: options.port },
      select: ['id'],
    });
    const directoryExists = await McServer.findOne({
      where: { directory: options.directory },
      select: ['id'],
    });

    if (portExists) {
      return [{ path: 'port', message: 'already in use...' }];
    }

    if (directoryExists) {
      return [{ path: 'directory', message: 'already in use...' }];
    }

    await McServer.create(options).save();

    return null;
  }

  @Mutation(() => [Error!], { nullable: true })
  async deleteServer(@Arg('id', () => Int) id: number) {
    const serverExist = await McServer.findOne({ where: { id: id } });

    if (serverExist) {
      await McServer.delete(id);

      return null;
    }

    return [{ path: 'Exists?', message: "the ip specified doesn't exists" }];
  }

  @Mutation(() => [Error!], { nullable: true })
  async updateServer(
    @Arg('options', () => McServerUpdate) options: McServerUpdate
  ) {
    const serverExists = await McServer.findOne({ where: { id: options.id } });

    if (!serverExists) {
      return [{ path: 'Server', message: 'Server Not found!' }];
    }

    McServer.update(options.id, options);
    return null;
  }

  @Mutation(() => Boolean, { nullable: false })
  async heartbeat(
    @Arg('port', () => Int) port: number,
    @Arg('players', () => Int) players: number
  ) {
    const portExists = await McServer.findOne({ where: { port: port } });
    if (!portExists) {
      McServer.update({ port: port }, { alive: false, players: 0 });
      return false;
    } else {
      McServer.update({ port: port }, { alive: true, players: players });
      return true;
    }
  }

  //Subscriptions
}
