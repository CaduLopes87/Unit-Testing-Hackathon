import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  /**
   * @param a recebe o primeiro número
   * @param b recebe o segundo número
   * @returns retorna a soma dos dois números recebidos
   */

  add(a: number, b: number) {
    return a + b;
  }
}
