import { createServer } from 'http'

const server = createServer((inboundRequest, outputResponse)=>{
            console.log(inboundRequest)
            outputResponse.end("entre")
});

server.listen(8080, ()=>{ console.log("escuchando"); })

