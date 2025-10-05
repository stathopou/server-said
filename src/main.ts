import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {KafkaOptions, RmqOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {KafkaConfig, RabbitMQConfig} from "./config/config.interface";
import {Logger} from "@nestjs/common";
import {rabbitmqConfigKey} from "./config/rabbitmq.config";
import {kafkaConfigKey} from "./config/kafka.config";

const logger = new Logger('Bootstrap');

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    const configuration = app.get(ConfigService);

    const rabbitMQconfig = configuration.get<RabbitMQConfig>(rabbitmqConfigKey);

    logger.log(`Starting Server Said application.`);
    logger.log(`RabbitMQ module enabled: ${rabbitMQconfig?.enabled}`);

    rabbitMQconfig?.enabled &&
    app.connectMicroservice<RmqOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${rabbitMQconfig.host}:${rabbitMQconfig.port}`],
            queue: `${rabbitMQconfig.messageQueue}`,
            exchange: `${rabbitMQconfig.messageExchange}`,
            exchangeType: 'fanout',
            prefetchCount: 30,
            noAck: true,
            queueOptions: {
                durable: true,
            },
        },
    });

    const kafkaConfig = configuration.get<KafkaConfig>(kafkaConfigKey);

    logger.log(`Kafka module enabled: ${kafkaConfig?.enabled}`);
    kafkaConfig?.enabled &&
    app.connectMicroservice<KafkaOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [`${kafkaConfig.broker}:${kafkaConfig.port}`],
                clientId: `${process.env.HOSTNAME}`
            },
            consumer: {
                groupId: `${kafkaConfig.groupId}`,
            },
            subscribe: {
                fromBeginning: true,
            }
        }
    });

    await app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
