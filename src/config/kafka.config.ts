import {registerAs} from '@nestjs/config';
import * as process from "node:process";

export const kafkaConfigKey = 'kafka';


export default registerAs(kafkaConfigKey, () => ({
    enabled: process.env.KAFKA_ENABLED !== 'false',
    broker: process.env.KAFKA_BROKER || 'localhost',
    port: process.env.KAFKA_PORT || 9092,
    groupId: process.env.KAFKA_GROUPID || 'server-said'
}));