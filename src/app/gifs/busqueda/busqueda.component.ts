import {Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: [
    ]
})
export class BusquedaComponent {
    // Va a buscar en el app-busqueda una referencia llamada txtBuscar y lo va a asignar a una variable
    // ! Se conoce como not null aception operator --> Operador para asegurarce de que el obkjeto no es null.
    @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
    
    // Para ocupar un servicio hay que inyectarlo
    constructor( private gifsService: GifsService ){
    
    }
    
    public buscar(){
        const valor : string =  this.txtBuscar.nativeElement.value;
        
        if (valor.trim().length === 0){
            return;
        }
        
        this.gifsService.buscarGifs(valor);
        
        this.txtBuscar.nativeElement.value = '';
    }
    
    
}
