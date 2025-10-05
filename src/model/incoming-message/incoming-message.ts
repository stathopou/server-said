export class IncomingMessage {
    content: string | object;
    receiverId: string;
    eventTime: Date;
    event: string;
    expires: Date;
}
