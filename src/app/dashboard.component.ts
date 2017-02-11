import { Component, OnInit } from '@angular/core';

import { DashboardService } from "./dashboard.service";

import { Meter } from "./meter";

@Component({
  selector: 'dashboard',
  templateUrl: "./dashboard.component.html",
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  meters: Meter[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getMeters()
            .subscribe(meters => {
                this.meters = meters;
            });
  }

}