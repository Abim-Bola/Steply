/*
* This container is fo dependency injection which allows 
* us to access modules/values/functions etc across our 
* application without the need to import them directly
*/

import { createContainer, InjectionMode, Lifetime, asClass, asFunction } from 'awilix'
import RedisClient from './services/redis'
import app from './app'
const redisClient = new RedisClient
const container = createContainer()

  container.register({
    injectionMode: InjectionMode.PROXY,
    redisClient: asClass(RedisClient),
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
