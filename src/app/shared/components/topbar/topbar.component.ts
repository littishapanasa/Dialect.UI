import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { TopbarService } from 'src/app/Services/topbar.service';
import { TopBarInfo } from '../../model/config';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public receiveValue: string = "Not Ready";
  data!: TopBarInfo;
  dropdownOpen: boolean = false;

  constructor(private _topbar: TopbarService) {}

  ngOnInit(): void {
    this.subscription.push(this._topbar.setUpTrigger.subscribe(res => {
      if (res) {
        this.data = res;
      }
    }));
    this.subscription.push(this._topbar.changeStatusTrigger.subscribe(res => {
      if (res) {
        this.receiveValue = res;
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((x) => x.unsubscribe());
  }

  selectOption(option: string) {
    this.receiveValue = option;
    this._topbar.statusChange(this.receiveValue);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideDropdown(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      !targetElement.closest('.dropdown') &&
      !targetElement.closest('.dropdown-toggle')
    ) {
      this.dropdownOpen = false;
    }
  }
}
