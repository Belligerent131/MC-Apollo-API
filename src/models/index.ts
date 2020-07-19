import { GraphQLModule } from '@graphql-modules/core';

import { serverInfo } from './server-info';

export const graphModules = new GraphQLModule({
    imports: [
        serverInfo
    ]
})

/**
 * Structure of the graphql model --
 * -Model
 * --ServerInfo(Handshake)
 *
 */