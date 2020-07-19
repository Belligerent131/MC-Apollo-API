export default {
  Query: {
    testMessage: (): string => 'Hello World!',
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
    getNumber(_, args: any) {
      return args.number;
    },
  },
};

/**
 * Resolvers are the interceptors of the graphql api. Think of queries as callable functions.
 * Parameters are as followed (parent, args, context, info)
 * parameters can be skipped using an underscore.
 */
