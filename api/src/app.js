import fastify from 'fastify';
import fastifyObjection from 'fastify-objection';

import User from './models/User';
import Role from './models/Role';
import UserRole from './models/UserRole';
import Lesson from './models/Lesson';
import Block from './models/Block';
import LessonBlockStructure from './models/LessonBlockStructure';
import Result from './models/Result';

import userService from './services/user';
import lessonsService from './services/lessons';
import learnService from './services/learn';
import lessonsManagementService from './services/lessons-management';

import errorsAndValidation from './validation';

export default (options = {}) => {
  const app = fastify(options);

  app.register(errorsAndValidation);

  app.register(fastifyObjection, {
    connection: process.env.DATABASE_URL,
    models: [User, Role, UserRole, Lesson, Block, LessonBlockStructure, Result],
  });

  app.register(userService, {
    prefix: '/api/v1/user',
  });

  app.register(lessonsService, {
    prefix: '/api/v1/lessons',
  });

  app.register(learnService, {
    prefix: '/api/v1/learn',
  });

  app.register(lessonsManagementService, {
    prefix: '/api/v1/lessons-management',
  });

  return app;
};
