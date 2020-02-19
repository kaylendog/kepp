import { Emoji, Message, PossiblyUncachedMessage } from 'eris';

import { Context } from '../commands/Context';

/**
 * Represents a pageable embed.
 */
export class PagedEmbed {
	public readonly pages: PagedEmbedPage[] = [];

	public currentPageIndex = 0;
	public currentPage = new PagedEmbedPage();

	public message?: Message;

	constructor(public readonly context: Context) {
		this.context.client.on('messageReactionAdd', (m, r) => this._handle(m, r));
	}

	async init() {
		await this.context.channel.createMessage(this.currentPage);
	}

	/**
	 * Add pages to the embed.
	 * @param pages
	 */
	addPages(...pages: PagedEmbedPage[]) {
		this.pages.push(...pages);
		if (!this.currentPage) {
			this.currentPage = this.pages[0];
		}
	}

	/**
	 * Move the pageable embed to the next page.
	 */
	nextPage() {
		this.currentPage = (this.currentPageIndex + 1) % this.pages.length;
	}

	/**
	 * Move the pageable embed to the previous page.
	 */
	previousPage() {
		this.currentPageIndex =
			this.currentPageIndex - 1 === -1
				? this.pages.length - 1
				: this.currentPageIndex - 1;
	}

	/**
	 * Change the pageable embed to show the target page.
	 */
	changePage(pageNumber: number) {
		this.currentPageIndex = pageNumber;
	}

	/**
	 * Handle a message reaction.
	 * @param msg
	 * @param reaction
	 */
	private _handle(msg: PossiblyUncachedMessage, reaction: Emoji) {
		if (msg.id != this.context.message.id) {
			return;
		}
	}

	/**
	 * Edit the embed message.
	 */
	private _rehydrateMessage() {
		if (!this.message) {
			return;
		}
		this.currentPage = this.pages[this.currentPageIndex];

		return this.message.edit(this.currentPage);
	}
}

export class PagedEmbedPage {}
