https://avilavate123.medium.com/understanding-nodejs-streams-c3a67d6f4bee

# What are streams?

There are many objects that node developers deal with are streams they
offer some unique set of features which makes them awesome when working
in distributed client server models where recourses like memory, time
are very critical.

The stream objects in node are the most misunderstood concept, though
streams are 1st class citizen in node and are used extensively by
developers but they still challenge developers.

Streams provide following 2 features compared to plane data:

They offer a continues stream of data (chunk of the whole data) to work
with.

The total size of data manipulated using stream can be larger than the
actually consumed memory resource.

Both of these features together help to solve some of the most common
performance related problems, both in terms of memory foot print of the
program and overall end user/consumer experience.

How streams are helpful?

Streams are programing constructs its best to understand streams with a
real world use case and comparing the code behavior when streams aren't
use.

I have created a git repository with a sample code to explain streams
using node fs module.

Node fs module provides common file system tasks such as reading file
stats, reading and writing files etc.

Node fs modules provides 2 functions to create readable and writable
file streams they are;

-   fs.createReadStream

-   createWriteStream

Generator.js & bigfile.js

Sample uses a generator.js script to create \`22MB text file
(bigfile.js), steps to generate bigfile.js

Run generator.js script to create the file. This file is used by node
http server (stream-http.js) to serve the file content to http client.

Stream-http.js

Stream-http.js provides a simple node http server which runs at 3333
port, run node stream-http.js to create the http server.

http server provides following 2 routs which are used to demonstrate the
functioning of streams and their impact.

The server provides following 2 routs;

/getfile: used to serve bigfile.js(\~22MB) to the client.

/getfile-stream; used to server bigfile.js to the client using fs
readable stream.

/getfile

Run the client using \`curl localhost;3333/getfile\`. And open the task
runner or activity monitor (depending on the OS).

Have a look at the memory consumed by the node process, here is how it
looks on my machine: ![](media/image2.png){width="6.6402777777777775in"
height="3.707638888888889in"}

Note: make sure to kill all the other node process running in order to
avoid any confusion.

It shows the memory consumed by an idle nodejs http server is **8.4MB**

Request the server using /getfile path and look at the memory consumed
by the node process:

![](media/image3.png){width="6.6402777777777775in"
height="4.063194444444444in"}

It shows the total memory consumption of the node server jumps to
**32MB** from **8.4MB.**

This addition of approximate 23.6MB is due to the bigfile.js which is
being request by the client.

Here is the code:

case \'/getfile\':

console.log(\"\..... hit\....\")

fs.readFile(file,(err,data)=\>{

if(err) console.log(err);

res.write(data);

res.end();

})

/getfile-stream

This rout uses fs stream to read the bigfile.js file and pass it to res
(http server response) object which is again a stream here is the code:

case \'/getfile-stream\':

const fsReadStream=fs.createReadStream(file);

fsReadStream.pipe(res);

break;

Have a look how fs read stream is being passed to the http server
response stream using pipe, this is another great advantage of streams
where streams can be passed to another stream object for further
processing (its similar how bash commands are passed using pipes ex ls
-l \| wc -l).

Here is the memory foot print of node server when /getfile-stream rout
is requested by the client:

![](media/image4.png){width="6.6402777777777775in"
height="4.278472222222222in"}

This time memory consumed by the node server is **15.7MB** which is much
less than the bigefile.js size (\~23MB) this is due the fact that the
rout this time using a stream which are being passed to response object
as and when the streams reader is ready with a chunk of data.

This explains how streams can help to reduce total memory consumption of
the process and helps in processing large amount of data, **how
efficient!**
