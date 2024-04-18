import container from 'container';
import { QueueTypes } from 'infra/services/queue/queues.enum';
import EmailQueueConsumer from 'infra/services/queue/email.consumer'
const amqp = require('amqplib');

const rabbitMQSetup = async () => {
    try {
        const connectRabbitMQ = await amqp.connect('amqp://localhost');
        const channel = await connectRabbitMQ.createChannel();
        Object.keys(QueueTypes).forEach(queue => {
            channel.assertQueue(queue);
        });
        container.cradle.logger.info("Rabbitmq connected Successfully")
        return { connectRabbitMQ, channel };
    } catch (error) {
        container.cradle.logger.error(`Error connecting to RabbitMQ ${error}`)
        process.exit(1);
    }
};
export default rabbitMQSetup;