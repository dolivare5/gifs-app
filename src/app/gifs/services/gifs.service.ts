import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse} from "../interfaces/gifs.interfaces";

@Injectable({
    // Es una caracteristica de angular 4 la cual permite de los servicios puedan estar definidos
    // en el momnto en que se construye el bundle.js. Al especificar providedIn: root en el
    // decorador le dice a angular que no importa en que parte de su aplicacion que sea que este
    // servicio va a ser unico y dee manera global en el root. Evita tener que especificarlo
    // en los provide del módulo al que pertenece. Esto es lo que vqueremos que los servicios sean
    // globales
    providedIn: 'root'
})
export class GifsService {
    
    private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
    private apiKey : string  = '7yFVpSupkAvwKdNGSfl8pF8pVRlsUEex';
    
    private _historial : string [] = []; //Propiedad privada para almacenar los strings
    
    public resultados : Gif[] = [];
    
    get historial(): String[] {
        return [...this._historial];
    }
    
    constructor(private http: HttpClient) {
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [] ;
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [] ;
    }
    
    buscarGifs( query: string ) : void{
        query = query.trim().toUpperCase();
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10);
            localStorage.setItem('historial',JSON.stringify(this._historial));
        }
        
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', query)
        ;
        
        this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
            .subscribe( resp => {
                this.resultados = resp.data;
                localStorage.setItem('resultados',
                    JSON.stringify(this.resultados))
            } );
        
    }
    
}
