
import container from "container"
import {connectRabbitMQ, channel } from "../../../startup/rabbitmq";


export default class RabbitMQ {
  constructor() {
    this.channel = channel;
  }

  /** This is where we pass our messages into a queue.
   * 
   * @param {*} queueName: The name of the queue the message will be sent to
   * @param {*} message: The message being sent to the queue
   * @returns 
   */

  async publishInQueue(queueName, message) {
    /**
     * Work on adding dead letter exchange(DLX) so that unsuccessful queues can be stored and logged  
     */
    channel.assertQueue(queueName, { durable: true, maxLength: 7 });
    message.publishedAt = new Date();
    const convertMessageToJsonFormat = JSON.stringify(message);
    return this.channel.sendToQueue(queueName, Buffer.from(convertMessageToJsonFormat));
  }

  /**
   * 
   * @param {*} queueName 
   * @param {*} message 
   * @returns 
   */
  async consumeQueue(queueName, message) {
    channel.assertQueue(queueName, { durable: true });
    message.publishedAt = new Date();
    const convertMessageToJsonFormat = JSON.stringify(message);
    return this.channel.sendToQueue(queueName, Buffer.from(convertMessageToJsonFormat));
  }

  //  async  createExchange(
  //   channel: amqp.ConfirmChannel,
  //   name: string,
  //   alternateExchangeName: string | null = null,
  //   options = { durable: true, autoDelete: false }
  // ) => {
  //   LOGGER.debug(`Create Exchange ${name}`);
  //   const exOptions: amqp.Options.AssertExchange = {
  //     durable: true,
  //     autoDelete: false,
  //     ...options,
  //   };
  //   if (alternateExchangeName) {
  //     exOptions.alternateExchange = alternateExchangeName;
  //   }
  
  //   await channel.assertExchange(name, 'fanout', exOptions);
  //   LOGGER.info(`Exchange ${name} created`);
  //   return name;
  // };

}
