/*
* This container is fo dependency injection which allows 
* us to access modules/values/functions etc across our 
* application without the need to import them directly
*/

import { createContainer, InjectionMode, Lifetime, asClass } from 'awilix'
import app from './app'

const container = createContainer()

 container.register({
    injectionMode: InjectionMode.PROXY,
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
