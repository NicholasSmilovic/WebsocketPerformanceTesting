const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let connections = {};
let count = 0;

wss.on('connection', function connection(ws) {
  connections[count] = ws;
  ws.id = count;
  count++;

  ws.on('message', function incoming(message) {
    try {
      let data = JSON.parse(message);
      switch(data.type) {
        case "ping":
          let timeTaken = Date.now() - data.payload.sent;
          send(ws, "pong", {  timeTaken  });
          break;
        default:
          console.log(message);
      }
    } catch (e) {
      console.log('received: %s', message.type);
    }
  });
});

wss.broadcast = function broadcast(type, payload) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      send(client, type, payload);
    }
  });
};

function send(ws, type, payload, err) {
  try {
    if(ws instanceof WebSocket && ws.readyState === ws.OPEN) {
      let message = JSON.stringify(compileMessage(type, payload));
      ws.send(message);
    } else {
      if(ws instanceof WebSocket) {
        err();
        console.log("not websocket")
      } else {
        console.log("not OPEN: ", ws)
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function compileMessage (type, payload) {
  return { type, payload }
}
function broadcast(data = false) {
  for(let client in connections) {
    send(connections[client], "heavy", {tick: data, heavyPayload:heavyPayload}, function err() {
      delete connections[client];
    });
  }
}
let numberOfGamesSim = 5;
var tickLengthMs = 1000 / 60

/* gameLoop related variables */
// timestamp of each loop
var previousTick = Date.now()
// number of times gameLoop gets called
var actualTicks = 0

var gameLoop = function () {
  var now = Date.now()

  actualTicks++
  if (previousTick + tickLengthMs <= now) {
    var delta = (now - previousTick) / 1000
    previousTick = now

    for(let i = 0; i < numberOfGamesSim; i++) {
      heavy();
      if(i === 0 ) {
        broadcast(true);
      } else {
        broadcast();
      }
    }

    console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks)
    actualTicks = 0
  }

  if (Date.now() - previousTick < tickLengthMs - 16) {
    setTimeout(gameLoop)
  } else {
    setImmediate(gameLoop)
  }
}

function timestamp() {
  return new Date().getTime();
}
function heavy() {
  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 10; j++) {
      let y = 0;
      y++
      let r = "aaaa";
    }
  }
}
heavyPayload = {"as":"as"}
let heavyPayload1 = [{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
}, {
  id: 1,
  transform: {
    position: {
      x: 7.490254936274141,
      y: 2.0000000004989023,
      z: -14.188117316225544
    },
    rotation: {
      x: 0,
      y: 0.018308020720336753,
      z: 0.1830802072033675,
      w: 0.9829274917854702
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
},
{
  id: 0,
  transform: {
    position: {
      x: 15.290663048624992,
      y: 2.0000000004989023,
      z: -24.90756910131313
    },
    rotation: {
      x: 0.32514392007855847,
      y: -0.8798439564294107,
      z: 0.32514392007855847,
      w: 0.12015604357058937
    }
  }
}]

gameLoop();
