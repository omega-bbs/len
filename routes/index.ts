import * as Router from 'koa-router';
import topics from './topics';

export const router = new Router();
router.use('/topics', topics.routes(), topics.allowedMethods());
