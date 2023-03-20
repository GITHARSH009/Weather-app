const http=require("http")
const fs=require("fs")  //val means whole API data
var requests = require('requests');
const homefile=fs.readFileSync("home.html","utf-8");

const replaceval=(tempval,orgval)=>{
         let temperature=tempval.replace("{temp}",orgval.main.temp);
         temperature=temperature.replace("{tempmin}",orgval.main.temp_min);
         temperature=temperature.replace("{tempmax}",orgval.main.temp_max);
         temperature=temperature.replace("{%location%}",orgval.name);
         temperature=temperature.replace("{%country%}",orgval.sys.country);
         temperature=temperature.replace("{%Kuchbhi%}",orgval.weather[0].main)
            
         return temperature;
};

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
    requests ('https://api.openweathermap.org/data/2.5/weather?q=Varanasi&appid=449a77d01160781df8970b0644175a74')
.on('data', function (chunk) {
    const objdata= JSON.parse(chunk);
    const arraydata=[objdata];
  const realdata=arraydata.map((val)=>
  replaceval(homefile,val)
  ).join(""); 
//   console.log(val);
  res.write(realdata);
})
.on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
    
  res.end(" ");
});
} 
});

server.listen(8000,"127.0.0.1","Everything ok")

     