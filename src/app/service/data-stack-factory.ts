import { Injectable } from "@angular/core";
import { ProgressElement } from "app/service/progresselement";
import { DeepBlueService } from "app/service/deepblue";
import { RequestManager } from "app/service/requests-manager";
import { Router } from "@angular/router";
import { DataStack } from "app/data-structures/data-stack/data-stack";

@Injectable()
export class DataStackFactory {
  constructor(private deepBlueService: DeepBlueService, private requestManager: RequestManager,
    private progress_element: ProgressElement, private router: Router) { }

  public newDataStack(): DataStack {
    return new DataStack(this.deepBlueService, this.requestManager, this.progress_element, this.router);
  }
}

