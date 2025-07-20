import {Module} from '@nestjs/common';
import {SseController} from './sse/sse.controller';
import {AmqpModule} from './amqp/amqp.module';
import {ServiceModule} from './service/service.module';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {KafkaModule} from './kafka/kafka.module';
import {ConfigModule} from "@nestjs/config";
import configuration from "./config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: configuration
        }),
        EventEmitterModule.forRoot(),
        AmqpModule,
        ServiceModule,
        KafkaModule],
    controllers: [SseController],
})
export class AppModule {
}
