import {Component} from '@angular/core';
import {Message} from 'primeng/primeng';

@Component({
    templateUrl: './upload.html',
    selector: 'regions-upload',
})
export class RegionsUpload {

    msgs: Message[];

    uploadedFiles: any[] = [];

    onUpload(event: any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}