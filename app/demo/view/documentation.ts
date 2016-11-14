import {Component} from '@angular/core';

@Component({
    templateUrl: 'app/demo/view/documentation.html',
    styles: [`
        .docs h1 {
            margin-top: 30px;
        }
        
        .docs pre {
            font-family: monospace;
            background-color: #0C2238;
            color: #dddddd;
            padding: 1em;
            font-size: 14px;
            border-radius: 3px;
            overflow: auto;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
        }
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }`
    ]
})
export class Documentation {
}