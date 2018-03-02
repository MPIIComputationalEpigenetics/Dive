import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ProgressElement {

    total_to_load = 0;
    total_loaded = 0;
    request_count: number = -1;
    public progressValueSource = new BehaviorSubject<number>(-1);
    progressValueValue$: Observable<number> = this.progressValueSource.asObservable();

    public progressMode = new BehaviorSubject<string>("determinate");
    progressModeValue$: Observable<string> = this.progressMode.asObservable();

    reset(total: number, request_count: number) {
        this.total_to_load = total;
        this.total_loaded = 0;
        this.request_count = request_count;
        this.progressValueSource.next(0);
    }

    setStatus(step: string, processed: number, total: number) {
        this.total_loaded = processed;
        this.total_to_load = total;

        const next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    }

    setMode(mode: string) {
        this.progressMode.next(mode);
    }

    startIndeterminate() {
        this.setMode("indeterminate");
        this.reset(1, -1);
        this.setStatus("loading", 0, 1);
    }

    finishIndeterminate() {
        this.setMode("determinate");
        this.finish();
    }

    increment(request_count: number) {
        if (request_count !== this.request_count) {
            return;
        }
        this.total_loaded++;

        const next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    }

    finish() {
        this.total_loaded = this.total_to_load;
        const next_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
        this.progressValueSource.next(next_value);
    }

    isLoading(): boolean {
        return this.total_loaded != this.total_to_load;
    }
}
