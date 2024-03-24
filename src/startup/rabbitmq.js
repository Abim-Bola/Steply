import container from 'container';

const amqp = require('amqplib');

let connectRabbitMQ;

(
async () => {
    try {
        connectRabbitMQ = await amqp.connect('amqp://localhost');
        const channel = await connectRabbitMQ.createChannel();
        container.cradle.logger.info("Rabbitmq connected Successfully")
        return { connectRabbitMQ, channel };
    } catch (error) {
        container.cradle.logger.error(`Error connecting to RabbitMQ ${error}`)
        process.exit(1);
    }
}
)();

export default  connectRabbitMQ ;
