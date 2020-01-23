import { GamePresence } from 'eris';

import { Module } from '../../../packages/snepsek/src';

export class Presence extends Module {
	presences: GamePresence[] = [
		{ name: 'the cutest floofs', type: 3 },
		{ name: 'the bestest boyes', type: 3 },
		{ name: 'with my tail', type: 0 }
	];
	currentIndex = 0;
	cycleTimeout?: NodeJS.Timeout;

	/**
	 * Cycle the bot's presence.
	 */
	cyclePresence() {
		this.client.editStatus('online', this.presences[this.currentIndex]);
		this.currentIndex = (this.currentIndex + 1) % this.presences.length;
		this.cycleTimeout = setTimeout(this.cyclePresence.bind(this), 15e3);
	}

	moduleDidInit() {
		this.logger.debug('Setting presence...');
		this.cyclePresence();
	}
}
