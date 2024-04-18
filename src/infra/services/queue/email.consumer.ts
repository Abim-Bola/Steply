import EmailService from "infra/services/email/EmailService"; 
import { QueueTypes } from "infra/services/queue/queues";
import container from "container";

/**
 * Api Email Consumer
 */

export class EmailQueueConsumer {
constructor (){

}

async process (message){
    const { recipient, type } = message;
    container.cradle.RabbitMQClass.consumeQueue(QueueTypes.EMAIL_SERVICE);
     await EmailService.welcomeEmail(recipient);
    // channel.ack()

}

}



export default new EmailQueueConsumer()