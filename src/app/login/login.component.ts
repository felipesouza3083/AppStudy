import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string;
  acessoNegado: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  autenticar(formLogin): void {
    this.mensagem = "Processando requisição...";
    this.acessoNegado = '';

    this.httpClient.post(environment.apiUrl + "/Usuarios/Authenticate",
      formLogin.value)
      .subscribe(
        (data: any) => {
          window.localStorage.setItem('access_token', data.accessToken);

          window.location.href = "/admin";
        },
        (e: any) => {
          if (e.status == 400) {
            this.acessoNegado = e.error.message;
            this.mensagem = '';
          }
          else {
            this.mensagem = "Ocorreu um erro ao processar a requisição.";
            this.acessoNegado = '';
          }
        }
      )
  }

  fecharMensagens() {
    this.mensagem = '';
    this.acessoNegado = '';
  }
}
