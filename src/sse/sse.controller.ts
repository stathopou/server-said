import {Controller, MessageEvent, Param, Sse} from '@nestjs/common';
import {fromEvent, map, Observable} from "rxjs";
import {Util} from "../util/util";
import {EventEmitter2} from "@nestjs/event-emitter";
import {IncomingMessage} from "../model/incoming-message/incoming-message";

@Controller('sse')
export class SseController {

    constructor(private eventEmitter: EventEmitter2) {}

    @Sse(":receiverId")
    sse(@Param('receiverId') receiverId: string): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, Util.eventNameResolver(receiverId))
            .pipe(map((m: IncomingMessage) => ({type : m.event, data: m})));
    }
}
