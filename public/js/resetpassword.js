var url ='https://api-mor.herokuapp.com'

  // ACESA A ROTA QUE RESETA O ACESSO
async function resetar() {
  event.preventDefault();
  

  const token = document.getElementById('token').value;
  const password = document.getElementById('password').value;

 
  await axios.put('/passwords', { "token": `${token}`,"password":`${password}` })
    .then(function (response) {
      console.log(response.data);
      if (response.status === 200) {
        alert("Senha Resetada com sucesso !");
        window.location.replace("home");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert('Favor, checar o token !', error);
      document.getElementById("form").reset();
    });
}
