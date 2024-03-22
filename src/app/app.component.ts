import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { register } from 'swiper/element/bundle'
import { SwiperContainer } from 'swiper/element/bundle';
import { SwiperSlide } from 'swiper/element/bundle';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
  ngOnInit() {
    register();
  }
}
