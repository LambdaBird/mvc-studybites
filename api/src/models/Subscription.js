import BaseModel from './BaseModel';

export default class Subscription extends BaseModel {
  static get tableName() {
    return 'subscriptions';
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

  static createSubscription(subscription) {
    return this.query().insert(subscription).returning('*');
  }
}
