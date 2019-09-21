import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from 'app/app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="footer">
            <div class="card clearfix">
                <span class="footer-text-left">
                    Max Planck Institute for Informatics - Computational Biology and Applied Algorithmics Department. <a href="https://www.mpi-inf.mpg.de/imprint/">Imprint</a> - <a href="https://www.mpi-inf.mpg.de/data-protection/">Data Protection</a>
                </span>
                <span class="footer-text-right">
                    <span class="ui-icon ui-icon-copyright"></span> <span>All Rights Reserved</span>
                </span>
            </div>
        </div>
    `
})
export class AppFooter {

}