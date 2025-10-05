export interface RabbitMQConfig {
    enabled: boolean;
    host: string;
    port: number;
    username: string;
    password: string;
    messageExchange: string;
    messageQueue: string;
}

export interface KafkaConfig {
    enabled: boolean;
    broker: string;
    port: number;
    groupId: string;
}