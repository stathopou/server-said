import {registerAs} from '@nestjs/config';
import * as process from "node:process";

export const kafkaConfigKey = 'kafka';


export default registerAs(kafkaConfigKey, () => ({
    enabled: process.env.KAFKA_ENABLED !== 'false',
}));