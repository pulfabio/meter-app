import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from "./dashboard.service";

import { Summary } from "./summary";

@Component({
  moduleId: module.id,
  selector: 'elettr',
  templateUrl: "./dashboard-elettr.component.html",
  styleUrls: ["./dashboard-elettr.component.css"]
})
export class DashboardElettrComponent implements OnInit {
  errorMessage: string;
  meters: Summary[];
  mode = 'Observable'; //Data is provided to this component as Observable

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() { this.getMeters(); } //Call method at lifecycle hook and not in constructor.

  getMeters() {
    this.dashboardService.getElettrMeters()
            .subscribe(
              meters => this.meters = this.meterSort(meters), //Sort array
              error => this.errorMessage = <any>error
            );
  }

  clickedRow(_id: string): void {
    this.router.navigate(['/detail', _id])
  }

  private meterSort(meters: Summary[]): Summary[] {
    return meters.sort(function(a,b) {return (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0);} );
  }

}