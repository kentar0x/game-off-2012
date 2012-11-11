// for animations which should block the player while they run.
// mimics the API of an ActionQueue.

var Movement = {
  queue: ActionQueue.create(),
  
  // is the player allowed to move?
  allowed: function() {
    // only if the Movement queue is empty.
    return this.queue.is_empty();
  },
  
  enqueue: function(body) {
    return this.queue.enqueue(body);
  },
  enqueue_async: function(body) {
    return this.queue.enqueue_async(body);
  },
  
  stop: function() {
    this.queue.stop();
  },
  resume: function() {
    this.queue.resume();
  }
};
