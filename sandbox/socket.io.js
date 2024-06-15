
const io = new Server(server)
io.on("connection", (socket) => {
    console.log("conectado: ", socket.id)
    socket.on("checkin", (data) => {
        console.log(data);
    })

})


expressService.set('socketServer', io) // ayuda!!!

