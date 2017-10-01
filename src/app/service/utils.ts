import { Injectable } from "@angular/core";

export class Utils {

  static convert(value: string, column_type: string): any {
    if ((column_type === 'string') || (column_type === 'category')) {
      return value;
    }

    if (column_type === 'double') {
      return Number(value);
    }

    if (column_type === 'integer') {
      return Number(value);
    }

    return value;
  }

}