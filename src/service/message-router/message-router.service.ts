import {Injectable, Logger} from '@nestjs/common';
import {IncomingMessage} from "../../model/incoming-message/incoming-message";
import {EventEmitter2} from "@nestjs/event-emitter";
import {Util} from "../../util/util";

@Injectable()
export class MessageRouterService {
    private readonly logger = new Logger(MessageRouterService.name);

    constructor(private eventEmitter: EventEmitter2) {}

    routeMessage(message: IncomingMessage) {
        this.logger.log(`Received a message to route for user ${message.receiverId}`);
        this.eventEmitter.emit(Util.eventNameResolver(message.receiverId), message);
    }

}
