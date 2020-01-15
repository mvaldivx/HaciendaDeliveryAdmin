

export class Configuracion{
    ip : string = 'localhost'//'3.15.223.31'
    puerto: string = '3030';
    servidor: string = 'http://'+this.ip;
    ipServidorImagenes: string = 'http://mauvalsa.com/HaciendaDelivery/'
    direccionImagenes: string = 'http://mauvalsa.com/HaciendaDelivery/resources/Images/'
    metodoSubeImagen: string = 'uploadImage.php'
}