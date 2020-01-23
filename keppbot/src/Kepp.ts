import { Client } from '../../packages/snepsek/src';

const kepp = new Client({});
kepp.loadModulesIn(`${__dirname}/modules`);

kepp.start('');
