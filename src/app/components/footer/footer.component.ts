import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/t.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {}
