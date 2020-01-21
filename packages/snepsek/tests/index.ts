import { Client } from '../src/Client';
import { Test } from './test';

const client = new Client({ compress: true });

client.addModule(Test);

client.start('');
