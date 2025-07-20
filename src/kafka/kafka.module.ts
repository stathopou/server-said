import {Module} from '@nestjs/common';
import {KafkaConsumer} from './kafka-consumer/kafka-consumer';
import {MessageRouterService} from "../service/message-router/message-router.service";

@Module({
    providers: [MessageRouterService],
    controllers: [KafkaConsumer]
})
export class KafkaModule {
}
