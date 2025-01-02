import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

@Component({
  selector: 'app-graph-page',
  template: `
    <div class="flex flex-col items-center min-h-screen bg-blue-50 mb-0">
      <!-- Header -->
      <div class="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
        <img src="../../../assets/logos/logo.png" alt="Logo" />
      </div>

      <!-- Chart -->
      <div class="flex flex-col items-center mt-8 space-y-6 w-3/4 can">
        <div class="w-full">
          <canvas #chartCanvas></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    canvas {
      display: block;
      margin: 0 auto;
      width: 100% !important;
      height: 400px !important;
    }
      can{
      margin-top:100px;
      }
  `]
})
export class GraphPageComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | undefined;
  idBilan: string | null = null; 
   
  
   

  constructor(@Inject(PLATFORM_ID) private platformId: any,private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const state = history.state;
const labels = state.labels || [];
const data = state.data || []; 
      setTimeout(() => {
        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (ctx) {
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Graphique de tendance',
                data: data,
                backgroundColor: '#4a90e2',
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                      size: 18,
                      weight: 'bold',
                    },
                    padding: 20,
                  }
                }
              },
              scales: {
                x: {},
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      });
    }
    this.idBilan = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.idBilan);

  }
}
