import BaseModel from './BaseModel';

export default class Subscribe extends BaseModel {
  static get tableName() {
    return 'subscribes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        ip: { type: 'string' },
        pathname: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }

  static createSubscribe(subscribe) {
    return this.query().insert(subscribe).returning('*');
  }
}
