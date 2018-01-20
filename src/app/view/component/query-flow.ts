import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DeepBlueService } from "app/service/deepblue";
import { IOperation } from "app/domain/interfaces";
import { TreeNode } from "primeng/primeng";
import { ProgressElement } from "app/service/progresselement";
import { Id } from "app/domain/deepblue";
import { debug } from "util";

@Component({
  templateUrl: './query-flow.html',
  selector: 'query-flow',
  styles: [`

.ui-organizationchart-node-content.department-cfo {
                      background-color: #7247bc;
                      color: #ffffff;
}

.ui-organizationchart-node-content.department-coo {
  background-color: #a534b6
  color: #ffffff;
}

.ui-organizationchart-node-content.department-cto {
  background-color: #e9286f;
                    color: #ffffff;
}

.company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
    padding: 0;
    border: 0 none;
}

body .ui-organizationchart .ui-organizationchart-line-down{
      background-color: #bcbcbc;
}

body .ui-organizationchart .ui-organizationchart-line-left{
  border-right: 1px solid #bcbcbc;
}

body .ui-organizationchart .ui-organizationchart-line-top{
  border-top: 1px solid #bcbcbc;
}

body .ui-organizationchart .ui-organizationchart-node-content{
  border-color: #bcbcbc;
}

body .ui-organizationchart .ui-organizationchart-node-content .ui-node-toggler{
  color: #bcbcbc;
}

.node-header,.node-content {
    padding: .5em .7em;
}

.node-header {
    background-color: #495ebb;
    color: #ffffff;
}

.node-content {
    text-align: left;
    border: 1px solid #495ebb;
}

.node-content img {
    border-radius: 50%;
}

.department-cfo {
    background-color: #7247bc;
    color: #ffffff;
}

.department-coo {
    background-color: #a534b6;
    color: #ffffff;
}

.department-cto {
    background-color: #e9286f;
    color: #ffffff;
}

.ui-person .ui-node-toggler {
    color: #495ebb !important;
}

.department-cto .ui-node-toggler {
    color: #8a0a39 !important;
}
`],
  encapsulation: ViewEncapsulation.None
})
export class QueryFlow implements OnInit {

  data: TreeNode[];
  selectedNode: TreeNode;

  @Output() queryOp = new EventEmitter<IOperation>();

  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) { };

  ngOnInit() {
    this.data = [];
  }

  @Input()
  set queryId(queryId: string) {
    let _queryId = (queryId && queryId.trim()) || null;

    this.data = [];

    if (!_queryId) {
      return;
    }

    this.deepBlueService.getQueryInfo(new Id(_queryId)).subscribe((op) => {
      setTimeout(() => {
        this.data = [this.build_tree(op)];
      }, 0);
    })
  }

  build_data_operation_node(o: any): TreeNode {
    let node: TreeNode = {};

    node.label = o.command + " (" + o.query_id.id + ")";
    node.type = 'person';
    node.data = {};
    node.data.parameters = [];

    this.deepBlueService.countRegionsRequest(o, this.progress_element, 0).subscribe((result) => {
      node.data.parameters.unshift("Total Regions: " + result.resultAsCount());
    });

    if (o._params) {
      node.data = { parameters: Object.keys(o._params).map((k: string) => k + ": " + o._params[k]) };
    }
    //node.type = o.query_id.id;
    node.styleClass = 'ui-person';
    node.expanded = true;

    let lookup_keys = [];
    let children: TreeNode[] = [];

    if (o.command == "intersection") {
      lookup_keys.push("_subject");
      lookup_keys.push("_filter");

    } else if (o._data._data_type == "operation_args") {
      delete o._data.args['cache'];
      node.data = { parameters: Object.keys(o._data.args).map((k: string) => k + ": " + o._data.args[k]) };

    } else {
      lookup_keys.push("_data");
    }

    for (let key of lookup_keys) {
      if (o[key]) {
        let c = this.build_tree(o[key]);
        children.push(c);
      }
    }

    if (children.length > 0) {
      node.children = children;
    }

    return node;
  }

  build_tree(o: any): TreeNode {
    if (!o) {
      return null;
    }

    switch (o._data_type) {
      case 'data_operation': return this.build_data_operation_node(o);
      default: {
        console.error("unknow:", o);
        return null;
      }
    }
  }
}
