import * as Router from 'koa-router';
import {getRepository} from 'typeorm';
import {Topic} from '../entity/Topic';

const router = new Router();

router.get('/', async function (ctx, next) {
    const topicRepository = getRepository(Topic);
    ctx.body = await topicRepository.find();
});

export default router;