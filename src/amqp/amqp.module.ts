import {Module} from '@nestjs/common';
import {SseListener} from './sse-listener/sse-listener';
import {MessageRouterService} from "../service/message-router/message-router.service";

@Module({
    controllers: [SseListener],
    providers: [MessageRouterService]
})
export class AmqpModule {
}
