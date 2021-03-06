import * as globals from './globals';
import * as userService from './userService';
import * as lessonService from './lessonService';
import * as emailService from './emailService';
import * as courseService from './courseService';
import * as fileService from './fileService';

export default {
  globals,
  userService,
  emailService,
  lessonService,
  courseService,
  fileService,
};

export * from './globals';
export * from './userService';
export * from './lessonService';
export * from './courseService';
export * from './fileService';
export * from './emailService';
