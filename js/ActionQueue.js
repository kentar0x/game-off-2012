// run code in order despite asyncronous callbacks.
// 
// this requires collaboration with all asynchronous calls,
// as in the following example:
// 
//   var actionQueue = ActionQueue.create();
//    actionQueue.enqueue(function() {
//      // this block executes first
//    }).then_async(function() {
//      // then this animation.
//      $('body').transition({opacity: 0}, function() {
//        // this callback runs when the animation finishes.
//        // tell the actionQueue to continue
//        actionQueue.resume();
//    }).then(function() {
//      // this block runs once the animation is over
//    });
// 
// this particular example could be achieved in a simpler way
// by using the animation's callback directly;
// explicit action queues are more useful when you need
// more control over the execution, for instance to have
// multiple interacting queues.

var ActionQueue = {
  create: function() {
    var paused = false;
    var queue = [];
    
    return {
      is_empty: function() {
        if (paused) {
          // an element is still running, even if its no longer on the queue.
          return false;
        } else {
          return (queue.length == 0);
        }
      },
      run_queue: function() {
        while (queue.length > 0 && !paused) {
          var body = queue.shift();
          body();
        }
      },
      
      enqueue: function(body) {
        if (this.is_empty()) {
          // run immediately
          body();
        } else {
          // run later
          queue.push(body);
        }
        
        return this;
      },
      enqueue_async: function(body) {
        var self = this;
        
        return self.enqueue(function() {
          self.stop();
          body();
        });
      },
      then: function(body) {
        // synonym for enqueue
        return this.enqueue(body);
      },
      then_async: function(body) {
        // synonym for enqueue_async
        return this.enqueue_async(body);
      },
      
      wait_for: function(other_queue, then_do) {
        var self = this;
        self.stop();
        
        var resume = function() {
          if (then_do) then_do();
          
          self.resume();
        };
        
        // dual purpose! depending on the argument type,
        // either wait for another queue of for time to pass.
        if ($.isNumeric(other_queue)) {
          var delay = other_queue;
          window.setTimeout(resume, delay);
        } else {
          other_queue.enqueue(resume);
        }
      },
      then_wait_for: function(other_queue) {
        var self = this;
        self.enqueue(function() {
          self.wait_for(other_queue);
        });
        
        return self;
      },
      
      stop: function() {
        paused = true;
      },
      resume: function() {
        if (paused) {
          paused = false;
          this.run_queue();
        }
      },
      
      clear: function() {
        queue = [];
        this.resume();
      }
    };
  }
};
