


const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(12345, '0.0.0.0', function(err){
    (err && console.error(err.stack || err)) || console.log('bound');
});



const fs = require('fs');
const path = require('path');
const sd = path.resolve(__dirname + '/fixtures/test.csv');
const strm = fs.createReadStream(sd).setEncoding('utf8');
const Rx = require('rxjs/Rx');
const csv2json = require('csv2json');
const  csv = require('csv-parser');

const p = Rx.Observable.prototype;

p.eachWait = function(timeout){

    const source = this;
    const values = [];
    let flipped = true;

    const onNext = function (sub){

          flipped = false;

          setTimeout(() => {

            var c = values.pop();
            if(c) sub.next(c);

            if(values.length > 0){
               onNext(sub);
            }
            else{
               flipped = true;
            }

         }, timeout);
    }

      return Rx.Observable.create(sub => {

          return source.subscribe(

                function next(v){

                         values.unshift(v);

                         if(flipped){
                             onNext(sub);
                         }


                 },
              sub.error.bind(sub),
              sub.complete.bind(sub)
          );

      });

}



const dest = strm
  .pipe(csv())
//  .once('headers',function($headers){
//       console.log('headers => ', $headers);
//       headers = $headers.map(function(h){
//            return String(h).trim();
//       });
//  })
  .once('end', function () {
     console.log('data has ended')
});

dest.on('error', function(e){
    console.error(e.stack || e);
});

const obs = Rx.Observable.fromEvent(dest, 'data')
      .eachWait(10);

obs.subscribe(v => {

//    const ret = {};
//
//    console.log('v => ',v);
//    console.log(typeof v);
//    const split = String(v).split(',').map(d => String(d).trim());
//
//    headers.forEach(function(h,i){
//        console.log('h => ', h);
//        ret[h] = split[i];
//    });

    console.log('sending...');
    server.send(JSON.stringify(v), 1111,'192.168.4.10', function(err){
          err && console.error(err.stack || err);
     });
});
