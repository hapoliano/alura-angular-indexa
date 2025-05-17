import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatos: Contato[] = [
    {"id": 1, "nome": "Romew", "telefone": "29 278869420", "email": "romew.garcia@gmail.com"},
  ]

  constructor() {
    //Tentar obter os dados do localStorage
    const contatosLocalStorageString = localStorage.getItem('contatos');
    const contatosLocalStorage =
      contatosLocalStorageString ? JSON.parse(contatosLocalStorageString) : null;

    //A condição abaixo previne que na primeira execução da app em um novo navegador o localStorage não seja carregado.
    if (contatosLocalStorage !== null) {
      this.contatos = contatosLocalStorage || null;
    }

    //Salvar os contatos no localStorage
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  obterContatos() {
    return this.contatos;
  }

  salvarContato(contato: Contato) {
    this.contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }
}