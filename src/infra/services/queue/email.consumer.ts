import EmailService from "infra/services/email/EmailService";
import rabbitMQSetup from "../../../startup/rabbitmq";
import container from "container";

/**
 * Api Email Consumer
  * @param {*} queueName: The name of the queue to consume
 */

export class EmailQueueConsumer {
    constructor() {
    }

    async consume(queueName: string) {
        try {
          const { channel } = await rabbitMQSetup();
          channel.assertQueue(queueName, { durable: true });
         await channel.consume(queueName, message => {
          const parseMessage = JSON.parse(message.content.toString());
             EmailService.welcomeEmail(parseMessage)
              channel.ack(message)
          })
        } catch (error) {
          container.cradle.logger.error(`Could not consume message to from queue, ${error}`);
        }
      
      }

}



export default EmailQueueConsumer