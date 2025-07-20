import {registerAs} from '@nestjs/config';
import * as process from "node:process";

export const rabbitmqConfigKey = 'rabbitmq';


export default registerAs(rabbitmqConfigKey, () => ({
    enabled: process.env.RABBITMQ_ENABLED !== 'false',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || 5672,
    username: process.env.RABBITMQ_USERNAME || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
    messageExchange: process.env.RABBITMQ_MESSAGE_EXCHANGE || 'server-said',
    messageQueue: process.env.RABBITMQ_MESSAGE_QUEUE || 'server-said-events'
}));