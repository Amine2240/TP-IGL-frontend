import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-graph-page',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div>
      <h2 class="text-center text-xl font-bold mb-4">Bar Chart</h2>
      <canvas baseChart
              [data]="barChartData"
              [options]="barChartOptions"
              [type]="barChartType">
      </canvas>
    </div>
  `,
  styles: [`
    canvas {
      display: block;
      margin: 0 auto;
      max-width: 700px;
    }
  `]
})
export class GraphPageComponent {
  @Input() tableData: { parametre: string; valeur: string; unite: string }[] = [];

  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: [], // To be populated dynamically
    datasets: [
      {
        data: [], // To be populated dynamically
        label: 'Values',
        backgroundColor: '#4a90e2'
      }
    ]
  };

  ngOnChanges(): void {
    if (this.tableData?.length) {
      this.barChartData.labels = this.tableData.map(item => item.parametre);
      this.barChartData.datasets[0].data = this.tableData.map(item => +item.valeur);
    }
  }
}