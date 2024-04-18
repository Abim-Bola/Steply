
import container from "container"
import EmailService from "infra/services/email/EmailService"; 
import rabbitMQSetup from "../../../startup/rabbitmq";


export default class RabbitMQ {
  constructor() {
  }

  /** This is where we pass our messages into a queue.
   * 
   * @param {*} queueName: The name of the queue the message will be sent to
   * @param {*} message: The message being sent to the queue
   * @returns 
   */

  async publishInQueue(queueName, message) {
    try {
      const { channel } = await rabbitMQSetup();
      /**
       * Work on adding dead letter exchange(DLX) so that unsuccessful queues can be stored and logged  
       */
      channel.assertQueue(queueName, { durable: true });
      message.publishedAt = new Date();
      const convertMessageToJsonFormat = JSON.stringify(message);
      return channel.sendToQueue(queueName, Buffer.from(convertMessageToJsonFormat));
    } catch (error) {
      container.cradle.logger.error(`Could not publish message to queue, ${error}`);
    }
 
  }

  /**
   * 
   * @param {*} queueName 
   * @param {*} message 
   * @returns 
   */
  async consumeQueue(queueName) {
    try {
      const { connectRabbitMQ, channel } = await rabbitMQSetup();
      channel.assertQueue(queueName, { durable: true });
      channel.consume(queueName, message => {
      const parseMessage = JSON.parse(message.content.toString());
        EmailService.welcomeEmail(parseMessage)
          channel.ack(message)
      })
    } catch (error) {
      container.cradle.logger.error(`Could not consume message to from queue, ${error}`);
    }
  
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
