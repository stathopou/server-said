export class Util {

    static eventNameResolver(id: string): string {
        return `sse.event.${id}`;
    }
}
