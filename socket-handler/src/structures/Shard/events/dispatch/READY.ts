import { EventHandler } from "../";
import { DispatchEvent, DispatchMessageTypes } from "../../../../types/WS";
import { ConnectionStatus } from "../../Connection";

export const READY: EventHandler<DispatchEvent> = {
	op: 0,
	handler: (shard) => {
		shard.connection.connectionStatus = ConnectionStatus.READY;
		shard.emit('ready');
	},
	t: DispatchMessageTypes.READY
};
