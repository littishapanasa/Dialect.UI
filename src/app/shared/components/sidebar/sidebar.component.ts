import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { localUser } from '../../model/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  activeIndex: number = 0; // Initialize with -1 to indicate no active item

  sidebarVisible: boolean = window.innerWidth >= 600; // Initially show sidebar for wider screens
  localUser!:localUser
  constructor(private elementRef: ElementRef) {}
  

  ngOnInit(): void {
    this.localUser = JSON.parse(localStorage.getItem('userDetails') ?? '');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sidebarVisible = event.target.innerWidth >= 600;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if(event.target.innerWidth <= 600){
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.sidebarVisible = false;
      }
    }
  }

  arrowBack(){
    this.sidebarVisible=false;
  }

  toggleSidebar() {
    // this.sidebarVisible = !this.sidebarVisible ;
    this.sidebarVisible = true;
  }

 


  setActiveIndex(index: number) {
    this.activeIndex = index;
  }
}
