import { Resolver, Mutation, InputType, Field, Arg } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';
import { Error } from './shareable';

@InputType()
class UserRegister {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => [Error!], { nullable: true })
  async createUser(@Arg('option', () => UserRegister) options: UserRegister) {
    const userExists = await User.findOne({
      where: { email: options.email },
      select: ['id'],
    });

    if (userExists) {
      return [{ path: 'email', message: 'already taken' }];
    }

    options.password = await bcrypt.hash(options.password, 10);

    await User.create(options).save();

    return null;
  }
}
