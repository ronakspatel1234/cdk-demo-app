

import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { ModalContainerComponent } from './modal-container.component';
import { ModalPosition } from '../modal.model';

let uniqueId = 0;

export class ModalContainerRef<T, R = any> {
    componentInstance: T;

    private readonly _afterOpened = new Subject<void>();

    private readonly _afterClosed = new Subject<R | undefined>();

    private readonly _beforeClosed = new Subject<R | undefined>();

    private result: R | undefined;

    constructor(
        private overlayRef: OverlayRef,
        public containerInstance: ModalContainerComponent,
        readonly id: string = `modal-${uniqueId++}`) {
        overlayRef.detachments().subscribe(() => {
            this._beforeClosed.next(this.result);
            this._beforeClosed.complete();
            this._afterClosed.next(this.result);
            this._afterClosed.complete();
            this.componentInstance = null!;
            this.overlayRef.dispose();
        });
    }

    close(dialogResult?: R): void {
        this.result = dialogResult;
        this.overlayRef.detach();
    }


    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }


    afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }


    beforeClosed(): Observable<R | undefined> {
        return this._beforeClosed.asObservable();
    }


    backdropClick(): Observable<MouseEvent> {
        return this.overlayRef.backdropClick();
    }


    keydownEvents(): Observable<KeyboardEvent> {
        return this.overlayRef.keydownEvents();
    }


    updatePosition(position?: ModalPosition): this {
        let strategy = this._getPositionStrategy();

        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        } else {
            strategy.centerHorizontally();
        }

        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        } else {
            strategy.centerVertically();
        }

        this.overlayRef.updatePosition();

        return this;
    }


    updateSize(width: string = '', height: string = ''): this {
        this._getPositionStrategy().width(width).height(height);
        this.overlayRef.updatePosition();
        return this;
    }

    afterOpen(): Observable<void> {
        return this.afterOpened();
    }


    beforeClose(): Observable<R | undefined> {
        return this.beforeClosed();
    }


    private _getPositionStrategy(): GlobalPositionStrategy {
        return this.overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
    }
}
