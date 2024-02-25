import container from 'container';

const amqp = require('amqplib');

let connectRabbitMQ;

(
async () => {
    try {
        connectRabbitMQ = await amqp.connect('amqp://localhost');
        const channel = await connectRabbitMQ.createChannel();
        await channel.assertQueue('todoTasks');
        container.cradle.logger.info("Rabbitmq connected Successfully")
        return { connectRabbitMQ, channel };
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        process.exit(1);
    }
}
)();

export default  connectRabbitMQ ;
