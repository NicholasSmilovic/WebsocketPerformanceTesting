const ws = new WebSocket('ws://5d351354.ngrok.io');

function sendMessage(ws, type, payload) {
  try {
    if(ws instanceof WebSocket && ws.readyState === ws.OPEN) {
      let message = JSON.stringify(compileMessage(type, payload));
      ws.send(message);
    }
  } catch (e) { console.log("send message ERROR: ", e)}
}
function compileMessage (type, payload) {
  return { type, payload }
}

let pingInterval = null;
let now = Date.now();
function startInterval() {
  pingInterval = setInterval(() => {
    now = Date.now();
    sendMessage(ws, "ping", {
      sent: now
    })
  }, 1000)
}

function pong(timeTaken) {
  console.log("ping: ", timeTaken);
}

let tickRate = Date.now();
function heavy(tick) {
  if(tick) {
    let now = Date.now();
    console.log("tickRate: ", (now - tickRate));
    tickRate = Date.now();
  }

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      let y = 0;
      y++
      let r = "aaaa";
    }
  }
}

ws.onopen = () => {
  ws.onmessage = (serverMessage) => {
    try {
      let message = null;
      try {
        message = JSON.parse(serverMessage.data);
      } catch (e) {
        console.log("message parse ERROR: ", e)
      }
      switch(message.type) {
        case "pong": pong(message.payload.timeTaken); break;
        case "heavy": heavy(message.payload.tick); break;
        default: console.log("message: ", serverMessage);
      }
    } catch(e) {
      console.log("whooops: ", e)
    }
  };

  startInterval();
}
