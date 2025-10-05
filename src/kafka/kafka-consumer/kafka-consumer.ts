import {Controller, Logger} from '@nestjs/common';
import {Ctx, KafkaContext, MessagePattern, Payload, Transport} from "@nestjs/microservices";
import {IncomingMessage} from "../../model/incoming-message/incoming-message";
import {MessageRouterService} from "../../service/message-router/message-router.service";
import {plainToInstance} from "class-transformer";

@Controller()
export class KafkaConsumer {
    private readonly logger = new Logger(KafkaConsumer.name);

    constructor(private readonly routerService: MessageRouterService) {
    }

    @MessagePattern('sse', Transport.KAFKA)
    handleSseMessage(@Payload() message: string, @Ctx() context: KafkaContext) {
        const m: IncomingMessage = plainToInstance(IncomingMessage, JSON.parse(message));

        this.logger.log(`Received from Kafka: ${JSON.stringify(m)}`);
        this.routerService.routeMessage(m);
    }
}
