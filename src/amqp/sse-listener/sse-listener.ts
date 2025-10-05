import {Controller, Logger} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext, Transport} from "@nestjs/microservices";
import {MessageRouterService} from "../../service/message-router/message-router.service";
import {IncomingMessage} from "../../model/incoming-message/incoming-message";

@Controller()
export class SseListener {
    private readonly logger = new Logger(SseListener.name);

    constructor(private readonly routerService: MessageRouterService) {}

   @EventPattern(undefined, Transport.RMQ)
    handleMessage(@Payload() message: IncomingMessage, @Ctx() context : RmqContext) {
        const m: IncomingMessage = plainToInstance(IncomingMessage, message);

        this.logger.log(`Received message from RabbitMQ: ${JSON.stringify(m)}`);

        this.routerService.routeMessage(m);
    }
}
