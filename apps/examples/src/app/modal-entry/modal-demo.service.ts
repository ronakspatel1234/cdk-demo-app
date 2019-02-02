import { Observable, Subscriber, observable } from "rxjs";

export class ModalServiceDemo {
   private name: Observable<string>;

    public getName(): Observable<string> {
        return this.name = new Observable((observer) => {
            setTimeout(() =>
            {
                observer.next('entry component');
            }, 2000);
        })
    }
}