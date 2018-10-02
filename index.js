var server=require('ws').Server;
var s =new server({ port:8080 });
var ip=require('ip');
console.log(ip.address());
console.log(s.address());
CLIENTS=[];
NAMES=[];
s.on('connection',function(ws){
	ws.on('message',function(message){
		var data=JSON.parse(message);
		console.log("Received:"+data.type);
		if(data.type=="login"){
			CLIENTS[CLIENTS.length]=ws;
			NAMES[NAMES.length]=data.name;
			for(var i=0;i<CLIENTS.length;i++){
				CLIENTS[i].send(data.name+" joined");
			}
		}
		else{
			for(var i=0;i<CLIENTS.length;i++){
				CLIENTS[i].send(data.msg);
			}
		}
	});
});