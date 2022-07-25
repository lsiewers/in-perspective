import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class RouterService {
    // Observable string sources
    private routerEmitter = new Subject<any>();
    // Observable string streams
    routeEmitted$ = this.routerEmitter.asObservable();
    // Service message commands
    route(change: any) {
        this.routerEmitter.next(change);
    }
}
