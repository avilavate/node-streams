Understanding streams in node.js via examples.
NodeJs Streams
Avil Avate
 
What are streams?
There are many objects that node developers deal with are streams they offer some unique set of features which makes them awesome when working in distributed client server models where recourses like memory, time are very critical.
The stream objects in node are the most misunderstood concept, though streams are 1st class citizen in node and are used extensively by developers but they still challenge developers.
Streams provide following 2 features compared to plane data:
They offer a continues stream of data (chunk of the whole data) to work with.
The total size of data manipulated using stream can be larger than the actually consumed memory resource.
Both of these features together help to solve some of the most common performance related problems, both in terms of memory foot print of the program and overall end user/consumer experience.
How streams are helpful?
Streams are programing constructs its best to understand streams with a real world use case and comparing the code behavior when streams aren’t use.
I have created a git repository with a sample code to explain streams using node fs module.
Node fs module provides common file system tasks such as reading file stats, reading and writing files etc.
Node fs modules provides 2 functions to create readable and writable file streams they are;
•	fs.createReadStream
•	createWriteStream

Generator.js & bigfile.js
Sample uses a generator.js script to create `22MB text file (bigfile.js), steps to generate bigfile.js

Run generator.js script to create the file. This file is used by node http server (stream-http.js) to serve the file content to http client.

Stream-http.js
Stream-http.js provides a simple node http server which runs at 3333 port, run node stream-http.js to create the http server.
http server provides following 2 routs which are used to demonstrate the functioning of streams and their impact.
The server provides following 2 routs;
/getfile: used to serve bigfile.js(~22MB) to the client.
/getfile-stream; used to server bigfile.js to the client using fs readable stream.
/getfile
Run the client using `curl localhost;3333/getfile`.





