
import EmailQueueConsumer from 'infra/services/queue/email.consumer';
import { QueueTypes } from 'infra/services/queue/queues.enum';
import container from "container";


/**
 * This function packages all our consumers so we can call them at the entry point of our application.
 */

export async function startAllConsumers() {
    try {
        const emailConsumer = new EmailQueueConsumer();



        await emailConsumer.consume(QueueTypes.EMAIL_SERVICE);
    } catch (error) {
        container.cradle.logger.error(`Could not consume queues, ${error}`);
    }
  
}
