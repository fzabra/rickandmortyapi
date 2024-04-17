import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent,
    ListComponent,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'rickandmortyapi';
  pathName = '';
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.pathName = this.router.url;
    });
  }
}
