import objection from 'objection';
import path from 'path';
import config from '../../config';

class UserRole extends objection.Model {
  static get tableName() {
    return 'users_roles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        userId: { type: 'integer' },
        roleId: { type: 'integer' },
        resourceType: { type: 'string' },
        resourceId: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }

  static async addMaintainer({ trx, userId, resourceId }) {
    await this.query(trx)
      .insert({
        userId,
        resourceId,
        roleId: config.roles.MAINTAINER.id,
        resourceType: config.resources.LESSON,
      })
      .returning('*');
  }

  static enrollToLesson({ userId, lessonId }) {
    return this.query()
      .insert({
        userId,
        roleId: config.roles.STUDENT.id,
        resourceType: config.resources.LESSON,
        resourceId: lessonId,
      })
      .returning('*');
  }

  static relationMappings() {
    return {
      users: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'users_roles.user_id',
          to: 'users.id',
        },
      },
      lessons: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Lesson'),
        join: {
          from: 'users_roles.resource_id',
          to: 'lessons.id',
        },
      },
      role: {
        relation: objection.Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Role'),
        join: {
          from: 'users_roles.role_id',
          to: 'roles.id',
        },
      },
    };
  }
}

export default UserRole;
