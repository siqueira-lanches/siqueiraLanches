import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = environment.SERVIDOR+'/api/produtos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listAll`);
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/findById/${id}`);
  }

  findByNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/findByNome/${nome}`);
  }

  save(produto: Partial<Produto>): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/save`, produto);
  }

  update(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/update/${id}`, produto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
