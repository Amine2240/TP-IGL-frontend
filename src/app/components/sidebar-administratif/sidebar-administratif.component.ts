import { Component } from '@angular/core';
import {  RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-administratif',
  standalone: true,
  imports: [CommonModule , RouterModule, RouterLink],
  templateUrl: './sidebar-administratif.component.html',
  styleUrl: './sidebar-administratif.component.scss'
})
export class SidebarAdministratifComponent {
  public navigationLinks = [
    {id : 0, path: 'page-dpi', label: 'Informations Patient' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {id : 4, path: 'decompte-frais', label: 'Décompte des Frais',icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  ];
  public sideBarBool = false;
  public toggleSidebar() {
    this.sideBarBool = !this.sideBarBool;
    
  }
}

