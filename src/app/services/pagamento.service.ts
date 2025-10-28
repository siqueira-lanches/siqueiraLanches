import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private apiUrl = environment.SERVIDOR+'/api/pagamentos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/listAll`, {
      withCredentials: true
    });
  }

  findById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/findById/${id}`, {
      withCredentials: true
    });
  }

  save(pagamento: { pedidoId: number, valor: number }): Observable<Pagamento> {
    return this.http.post<Pagamento>(`${this.apiUrl}/save`, pagamento, {
      withCredentials: true
    });
  }

  update(id: number, pagamento: { pedidoId: number, valor: number }): Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.apiUrl}/update/${id}`, pagamento, {
      withCredentials: true
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      withCredentials: true
    });
  }
}
