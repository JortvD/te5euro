const http = require("http");
const url = require("url");
const fs = require("fs");

const data = require("./data.json");

let server = http.createServer((req, res) => {
  const requrl = new url.URL("http://test.com" + req.url);
  
  switch(requrl.pathname) {
    case "/request":
      let name = requrl.searchParams.get("name");
      let email = requrl.searchParams.get("email");
      let amount = parseInt(requrl.searchParams.get("amount"));

      data.buyers.push({name, email, amount});

      console.log(`${name} heeft ${amount} loten gekocht met email ${email}`);

      if(amount == 1) {
        const link = getLink(data.euro2);
        res.statusCode = 200;
        res.end(JSON.stringify({link}));
      }
      else if(amount == 3) {
        const link = getLink(data.euro5);
        res.statusCode = 200;
        res.end(JSON.stringify({link}));
      }
      else if(amount == 6) {
        const link = getLink(data.euro10);
        res.statusCode = 200;
        res.end(JSON.stringify({link})); 
      }
      else if(amount == 9) {
        const link = getLink(data.euro15);
        res.statusCode = 200;
        res.end(JSON.stringify({link})); 
      }
      else if(amount == 18) {
        const link = getLink(data.euro30);
        res.statusCode = 200;
        res.end(JSON.stringify({link})); 
      }
      else {
        res.statusCode = 400;
        res.end("ERROR");
      }
      break;
    default:
      let path = requrl.pathname;
      if(path == "/") path = "/index.html";
      try {
        const data = fs.readFileSync("." + path);
        res.statusCode = 200;
        res.end(data);
      } catch {
        console.log(path + " werd aangevraagd maar niet gevonden");
        res.statusCode = 500;
        res.end();
      }
      break;
  } 
});

server.listen(8281)

let getLink = arr => {
  for(let item of arr) {
    if(item.used >= 28) continue;

    item.used++;

    return item.link;
  }

  throw Error("out of links");
}

function noOp() {};

let Cleanup = function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    console.log('Ctrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
};

Cleanup(() => {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, '\t'))
})