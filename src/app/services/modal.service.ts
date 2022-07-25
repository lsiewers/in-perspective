import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class ModalService {
    // Observable string sources
    private modalEmitter = new Subject<any>();
    // Observable string streams
    modalEmitted$ = this.modalEmitter.asObservable();
    // Service message commands
    open(bool: boolean) {
        this.modalEmitter.next(bool);
    }
}
