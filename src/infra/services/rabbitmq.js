
import container from "container"
import {connectRabbitMQ, channel } from "../../startup/rabbitmq";


export default class RabbitMQ {
  constructor() {
    this.channel = channel;
  }

  async publishInQueue(queueName, message) {
    /**
     * Work on adding dead letter exchange(DLX) so that unsuccessful queus can be stored and logged  
     */
    channel.assertQueue(queueName, { durable: true });
    const convertMessageToJsonFormat = JSON.stringify(message);
    return this.channel.sendToQueue(queueName, Buffer.from(convertMessageToJsonFormat));
  }

}
