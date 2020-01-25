import { Client } from '../../packages/snepsek/src';
import { env } from './env';

const kepp = new Client({});
kepp.loadModulesIn(`${__dirname}/modules`);

kepp.start(env.TOKEN);
