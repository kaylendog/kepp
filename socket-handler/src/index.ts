import { env } from './env';
import { Manager } from './Manager';

const manager = new Manager({
	token: env.TOKEN
});
manager.startShards();
