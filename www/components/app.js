// arquivo de funções do aplicativo

// função ao aplicação ao tocar no botão enviar
$(document).on('click', '#enviar', function(){

  // definindo variáveis para checar se os campos estão preenchidos
  var campo = {
    'nome': $('#nome').val(),
    'email': $('#email').val()
  };

  // verificando se os campos estão preenchidos
  if ((campo.email == null) || (campo.email == "")){
    $('#email').css('border-color', 'red');    

    if ((campo.nome == null) || (campo.nome == "")){
      $('#nome').css('border-color', 'red');
    }
    else{
      $('#nome').css('border-color', 'default');
    }
    navigator.notification.alert('Preencha os campos', null, 'Atenção');
  }
  else if ((campo.nome == null) || (campo.nome == "")){
    $('#nome').css('border-color', 'red'); 

    if ((campo.email == null) || (campo.email == "")){
      $('#email').css('border-color', 'red');
    }
    else{
      $('#email').css('border-color', 'default');
    }
    navigator.notification.alert('Preencha os campos', null, 'Atenção');
  }
  else{
    $('#meuModal').modal(); // abrir janela de espera
    inserirDados(); // chama a função para inserir os dados
  }
});

// função para inserir dados no banco
function inserirDados(){

  // definindo dados a serem mandados ao servidor
  var paramentros = {
      'nome': $('#nome').val(),
      'email': $('#email').val()
    };
    // conectando-se ao servidor via ajax
    $.ajax({
        type:'post', //como enviar
        url:'https://prjodb-peckins.c9users.io/cadastrar.php', //link do servidor
        data: paramentros,
        // se der certo
        success: function(data){
          navigator.notification.alert(data, limpaCampos, 'Cadastro');
        },
        // caso der errado
        error: function(data){
          navigator.notification.alert(data, limpaCampos, 'Erro');
        }
    });    
}

// função de limpar os campos
function limpaCampos(){
  $('input').val(null); // limpa as inputs
  $('input').css('border-color', 'default'); // restaura as inputs para borda padrão
  $('#meuModal').modal('hide'); // fecha o modal
}