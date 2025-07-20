import {Controller, Logger} from '@nestjs/common';
import {Ctx, KafkaContext, MessagePattern, Payload, Transport} from "@nestjs/microservices";
import {IncomingMessage} from "../../model/incoming-message/incoming-message";
import {MessageRouterService} from "../../service/message-router/message-router.service";

@Controller()
export class KafkaConsumer {
    private readonly logger = new Logger(KafkaConsumer.name);

    constructor(private readonly routerService: MessageRouterService) {
    }

    @MessagePattern('sse', Transport.KAFKA)
    handleSseMessage(@Payload() msg: IncomingMessage, @Ctx() context: KafkaContext) {
        this.logger.log(`Received from Kafka: ${JSON.stringify(msg)}`);
    }
}
