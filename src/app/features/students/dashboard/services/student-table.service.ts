import { Injectable } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';

@Injectable({
    providedIn: 'root',
})
export class StudentTableService {
    private storageKey = 'lastTableEvent';

    get lastTableEvent(): TableLazyLoadEvent {
        const stored = sessionStorage.getItem(this.storageKey);
        return stored
            ? JSON.parse(stored)
            : ({ first: 0, rows: 20 } as TableLazyLoadEvent);
    }

    set lastTableEvent(event: TableLazyLoadEvent) {
        sessionStorage.setItem(this.storageKey, JSON.stringify(event));
    }
}
