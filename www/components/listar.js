  // Arquivo para conexão com banco de dados

  $(document).on('click', '#enviar', function(){

    var campoVazio = true;

    
    verificarCampos(campoVazio);

    console.log(campoVazio);

    if (campoVazio == false){
      
      // exibindo janela de espera
      $('#meuModal').modal();
      inserirDados();
    }

  });

  // redirecionando a página ao clicar no botão listar
  $(document).on('click', '#listar', function(){
    window.location.href = "listar.html";
  });

  function inserirDados(){
    var paramentros = {
      'nome': $('#nome').val(),
      'email': $('#email').val()
    };

    $.ajax({
        type:'post', //como enviar
        url:'https://prjodb-peckins.c9users.io/cadastrar.php', //link do servidor
        data: paramentros,
        // se der certo
        success: function(data){
          navigator.notification.alert(data);
        },
        // caso der errado
        error: function(data){
          navigator.notification.alert(data);
        }
    });

    limparCampos();
    
    //  escondendo janela de espera
    $('#meuModal').modal('hide');
  }

  // função para listar os dados do banco
  function listarPessoas(){

    var itemLista = "";

    $.ajax({
      type:'post', //como enviar
      url:'https://prjodb-peckins.c9users.io/listar.php', //link do servidor
      dataType:'json', //tipo de arquivo
      // se der certo
      success: function(data){
        $.each(data.pessoas, function(i,dados){
          itemLista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
        });
        
        $('#selecao').html(itemLista);
      },
      // se der errado
      error: function(data){
        navigator.notification.alert(data);
      }
    });

  }

  function limparCampos(){
    $('input').val(null);
    $('input').css('border-color', 'default');
  }

  function verificarCampos(campoVazio){
    var campo = $('input').val();

    if ((campo == null) || (campo == "")){
      navigator.notification.alert('Preencha os campos', null, 'Atenção');

      $('input').css('border-color', 'red');

      campoVazio = true;
    }
    else{
      campoVazio = false;
    }

    return campoVazio;
  }