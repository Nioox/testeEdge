function novaImg(){
var data = sessionStorage.getItem("user")
const u = JSON.parse(data)
document.getElementById("imgPerfil").src = u.url
document.getElementById("nomePerfil").innerHTML = u.name
$('#exampleModal').modal(show)
}

novaImg()