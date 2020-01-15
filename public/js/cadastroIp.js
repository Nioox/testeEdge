async function carregaLocal(){
  
  var dados
 
  await axios.get('/ip')
  .then(function(response){
     dados = response.data.data 
  })
  .catch(function(error){
  })
  

  for (var i = 0; i < dados.length; i++) {
    var select = document.getElementById("Select");
    var option = document.createElement("option");
    option.text = dados[i].local;
    select.add(option);
}


}

carregaLocal()




// FUNCAO QUE CRIA IP
async function cadastraIp() {
  event.preventDefault()

  const local = document.getElementById('local').value;
  const ip = document.getElementById('ip').value;
  

  await axios.post('/ip', {
    "local": `${local}`,
    "ip": `${ip}`
  })

    .then(function (response) {
      console.log(response.data)
      alert("Local/IP Cadastrado com sucesso !")
      campos.disabled = true
      limparCampos()
      document.location.reload();

    })
    .catch(function (error) {
      console.log(error)
      alert('Problema ao cadastrar ! Ver log.')
    })
}

// FUNCAO QUE BUSCA O USUARIO

async function buscarLocal() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var busca = y[x].text
  
  
                                    //func que remove toda acentuação 

  await axios.get("/ip/" + busca.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))

    .then(function (response) {
      campos.disabled = false
      localAltera.value = response.data.local
      ipAltera.value = response.data.ip

    })
    .catch(function (error) {
      alert("Local não encontrado, verificar log.")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })

}

// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA
async function alteraIp() {
  event.preventDefault()

  const campos = document.getElementById('campos')
  const localAltera = document.getElementById('localAltera').value
  const ipAltera = document.getElementById('ipAltera').value



  // AQUI OK ! 
  await axios.put("/ip", {
    "local":`${localAltera}`,
    "ip": `${ipAltera}` 
  })

    .then(function (response) {
      alert("Local / IP alterado com sucesso !")
      document.getElementById("formBusca").reset()
      document.getElementById("formAltera").reset()     
      campos.disabled = true
      limparCampos()

    })
    .catch(function (error) {
      console.log(error)
      alert("Não foi possivel alterar este cadastro")
    })
}

async function excluirEmpresa() {
  event.preventDefault()

  const empresaAltera = document.getElementById('usuarioAltera').value

  await axios.delete("/files/" + urlID)

    .then(function (response) {

      alert("Usuario excluido com sucesso !")
      console.log(response)

    })
    .catch(function (error) {

      console.log(error)
      alert("Verificar log")

    })



  await axios.delete("/empresa/" + empresaAltera)

    .then(function (response) {
      alert("Empresa excluida com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();


    })
    .catch(function (error) {
      alert("Não foi possivel excluir")

    })
}

function atualizaTabela() {
  $('#teste').DataTable().ajax.reload();
}

function mostrarTabela() {
  $(document).ready(function () {
    $('#teste').DataTable({
      "ajax": "../ip",
      "columns": [{
        "data": "local"
      },
      {
        "data": "ip"
      }
      ],
      "language": idioma,
      buttons: [
        'copy', 'excel', 'pdf'
      ]
    })
  })
  var idioma = {

    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
      "sNext": "Próximo",
      "sPrevious": "Anterior",
      "sFirst": "Primeiro",
      "sLast": "Último"
    },
    "oAria": {
      "sSortAscending": ": Ordenar colunas de forma ascendente",
      "sSortDescending": ": Ordenar colunas de forma descendente"
    },
    "select": {
      "rows": {
        "_": "Selecionado %d linhas",
        "0": "Nenhuma linha selecionada",
        "1": "Selecionado 1 linha"
      }
    }
  }
  $('#teste').DataTable({
    responsive: true
  })
}




function limparCampos() {
  const campos = document.getElementById('campos')
  campos.disa
  document.getElementById("form").reset();
  document.getElementById("formBusca").reset();
  document.getElementById("formAltera").reset();

}
mostrarTabela()


