"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const axios_1 = __importDefault(require("axios"));
const initBroker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let connection = yield amqplib_1.default.connect('amqp://3.228.161.219');
        let ch = yield connection.createChannel();
        ch.consume('ventas', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const datos_pago = msg.content.toString();
                console.log(datos_pago);
                const response = yield axios_1.default.post('http://54.160.45.166:3002/pedidos', { datos_pago });
                console.log('Respuesta de la API:', response.data);
            }
            catch (error) {
                console.error('Error al enviar los datos a la API:', error);
            }
            ch.ack(msg);
        }));
        console.log('El broker ha iniciado correctamente');
    }
    catch (error) {
        console.log('Hubo un error al iniciar el broker', error);
    }
});
initBroker();
