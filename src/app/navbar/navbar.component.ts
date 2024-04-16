import { Component, Renderer2  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BooleanInput } from '@angular/cdk/coercion';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less'
})
export class NavbarComponent {
  pathName = '';
  mdcBackdrop: BooleanInput = false;
  drawerMode: MatDrawerMode = "push";

  readonly breakpoint$ = this.breakpointObserver
  .observe([ '(max-width: 500px)']);

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private renderer: Renderer2,
    private router: Router) {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanges()
    );
    this.router.events.subscribe(() => {
      this.pathName = this.router.url;
    });
  }

  breakpointChanges(): void {

    if (this.breakpointObserver.isMatched('(max-width: 500px)')) {
      this.drawerMode = "over";
      this.mdcBackdrop = true;
    } else {
      this.drawerMode = "push";
      this.mdcBackdrop = false;
    }
  }

  onButtonClick() {
    const parentSearchElement = document.getElementById('parent-search');
    if (parentSearchElement) {
      const currentMarginTop = window.getComputedStyle(parentSearchElement).marginTop;
      const newMarginTop = currentMarginTop === '150px' ? '0px' : '150px';
      this.renderer.setStyle(parentSearchElement, 'margin-top', newMarginTop);
    } else {
      console.error('Elemento com ID "parent-search" não encontrado.');
    }
  }
}
