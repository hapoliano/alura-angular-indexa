import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { ContainerComponent } from "./componentes/container/container.component";
import { ContatoComponent } from './componentes/contato/contato.component';
import { SeparadorComponent } from './componentes/separador/separador.component';

interface Contato {
  id: number
  nome: string
  telefone: string
}

import { FormsModule } from '@angular/forms';
import agenda from './agenda.json';
import { FormularioContatoComponent } from "./paginas/formulario-contato/formulario-contato.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule,
    FormularioContatoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtroPorTexto: string = ''

  // Remove os acentos de uma string
  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatorPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      // Compara os nomes sem acentuações
      return this.removerAcentos(contato.nome).toLowerCase().includes(this.removerAcentos(this.filtroPorTexto).toLowerCase());
    })

  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatorPorTexto().filter(contato => {
      // Compara a letra inicial sem considerar acentuações
      return this.removerAcentos(contato.nome).toLowerCase().startsWith(this.removerAcentos(letra).toLowerCase());
    });
  }
}
