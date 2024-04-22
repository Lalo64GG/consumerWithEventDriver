import amqplib from 'amqplib';
import axios from 'axios'; 

const initBroker = async () => {
    try {
        let connection = await amqplib.connect('amqp://34.224.85.123');
        let ch = await connection.createChannel();
    
        ch.consume('ventas', async (msg: any) => {
            try {
                const datos_pago = msg.content.toString();
                console.log(datos_pago);

                const response = await axios.post('http://54.160.45.166:3002/pedidos', { datos_pago });

                console.log('Respuesta de la API:', response.data);
            } catch (error) {
                console.error('Error al enviar los datos a la API:', error);
            }

            ch.ack(msg);
        });

        console.log('El broker ha iniciado correctamente');
    } catch (error) {
        console.log('Hubo un error al iniciar el broker', error);
    }
}

initBroker();