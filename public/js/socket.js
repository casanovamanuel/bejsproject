const socket = io("localhost:8080")
const req = new Request("/api/product")  // abuso de que estoy en el mismo servidor shhhhhh
const productDiv = document.getElementById('productList')




socket.emit("checkin", "te estoy hablando, escuchame")

const doRefresh = async () => {

    fetch(req).then((response) => {
        response.json().then((data) => {
            let responseList = ""
            if (data.length == 0) { responseList = "No hay Productos" }
            else {
                responseList = "<ul>"
                data.forEach(element => {
                    responseList += "<li>" + element.code + " - " + element.title + "</li>"
                })
                responseList += "</ul>"
            }
            productDiv.innerHTML = responseList
            //console.log(responseList);
        })
    })
}
doRefresh()

socket.on('refreshProduts', () => {
    console.log("me pidieron refrescar")
    doRefresh()
})

