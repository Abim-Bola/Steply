/*
* This container is fo dependency injection which allows 
* us to access modules/values/functions etc across our 
* application without the need to import them directly
*/

import { createContainer, InjectionMode, Lifetime, asClass, asValue } from 'awilix'
import RedisClient from './services/redis'
import logger from './startup/logger'
const redisClient = new RedisClient
const container = createContainer()

  container.register({
    injectionMode: InjectionMode.PROXY,
    redisClient: asClass(RedisClient),
   logger: asValue(logger),
  })

  container.loadModules(
    [
      // Load repositories
      [
        "infra/repositories/**/*.js",
        {
          lifetime: Lifetime.SCOPED,
          register: asClass,
        },
      ],
    ],
    {
      formatName: "camelCase",
      resolverOptions: {},
      cwd: __dirname,
    }
  );

export default container
