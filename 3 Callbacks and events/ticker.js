import { clear } from 'console';
import { EventEmitter } from 'events';

function ticket(num, callback) {
  let count = 0;
  const eventEmitter = new EventEmitter();
  const s = setInterval(() => {

    const date = Date.now();
    if (date % 5 === 0) {
      callback("divisible by 5");
      eventEmitter.emit('finish', s);
    } else {

      if (num > 0) {
        count++;
        eventEmitter.emit('tick', num);
        num = num - 50;
      } else {
        eventEmitter.emit('error', new Error('No more tickets available'));
        eventEmitter.emit('finish', s);
        callback(null, count);
      }

    }
  }, 50);

  return eventEmitter;
}

ticket(1000, (err, count) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`Ticket number was: ${count}`);
  }
})
  .on('tick', (num) => {
    console.log(`Ticket: ${num}`);
  })
  .on('finish', (s) => {
    clearInterval(s);
    console.log('Finished');
  })
  .on('error', (err) => {
    console.error(`Error: ${err.message}`);
  })
  .emit('tick', 0);

