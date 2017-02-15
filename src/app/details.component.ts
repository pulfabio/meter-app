import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { DashboardService } from "./dashboard.service";

import "rxjs/add/operator/switchMap";

import { Meter } from "./meter";

@Component({
  moduleId: module.id,
  selector: 'detail',
  templateUrl: "./details.component.html"
})
export class DetailsComponent implements OnInit {

errorMessage: string;
  details: Meter[];
  mode = 'Observable'; //Data is provided to this component as Observable

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

  ngOnInit(): void { this.getDetails(); } //Call method at lifecycle hook and not in constructor.

  getDetails(): void {
  this.route.params
    .switchMap((params: Params) => this.dashboardService.getDetails(params["livello"]))
      .subscribe(
        details => this.details = this.detailSort(details), //Sort array
        error => this.errorMessage = <any>error
      );

  }

  goBack(): void {
    this.location.back(); //We can prevent illegal routing (too far back) with the CanDeactivate guard
}

private detailSort(details: Meter[]): Meter[] {
    return details.sort(function(a,b) {return (a.incaricato > b.incaricato) ? 1 : ((b.incaricato > a.incaricato) ? -1 : 0);} );
  }

}
