import { Injectable }     from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';
import { IOperation } from '../domain/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultData {

  constructor(private deepBlueService: DeepBlueService) {

  }

  TILING_REGIONS_5K() : Observable<IOperation>{
    return this.deepBlueService.tilingRegions(10 * 1000, [], -1);
  }


}