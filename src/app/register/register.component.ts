import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensagem: string;
  validationErrors: any[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  cadastrar(formRegister): void {
    this.mensagem = "Processando cadastro...";
    this.validationErrors = [];

    this.httpClient.post(environment.apiUrl + "/Usuarios", formRegister.value)
      .subscribe(
        (data: any) => {
          this.mensagem = data.message;

          formRegister.reset();
        },
        (e: any) => {
          if (e.status == 400) {
            this.mensagem = "Ocorreram errors de validação no preenchimento do formulário.";
            this.validationErrors = e.error;

          }
          else {
            this.mensagem = "ocorreu um erro na req.";
          }
        }
      );
  }

  fecharMensagem() {
    this.mensagem = '';
  }
}
