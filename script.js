const estilosDisplay = ['block', 'none'];
const estilosTransicao = ['0px', '0px, -10px'];

const radioButtons = document.querySelectorAll('.radioButton');
radioButtons.forEach(radio => {
  radio.addEventListener('click', () => {
    desmarcaRadios(radioButtons);
    radio.children[0].classList.add('checkRadioButton');
  })
});

const todos = document.querySelector('.checkTodos');
const checks = document.querySelectorAll('.check');
let checksMarcados = 0;

checks.forEach(item => {
  item.addEventListener('click', () => {
    item.children[0].classList.toggle('classnone');
    if (item.children[0].classList.contains('classnone')) {
      item.style.display = 'block';
      checksMarcados--;
    } else {
      item.style.display = 'contents';
      checksMarcados++;
    }

    if (checksMarcados == 0) {
      todos.children[0].classList.add('classnone');
      todos.style.display = 'block';
    } else if (checksMarcados == checks.length) {
      todos.children[0].classList.remove('classnone');
      todos.children[0].innerHTML = 'check_box';
      todos.style.display = 'contents';
    } else {
      todos.children[0].classList.remove('classnone');
      todos.children[0].innerHTML = 'indeterminate_check_box';
      todos.style.display = 'contents';
    }

  })
});
    function marcarCheck(item){
      item.children[0].classList.remove('classnone');
      item.children[0].innerHTML = 'check_box';
      item.style.display = 'contents';
    }
    function desmarcarCheck(item){
      item.children[0].classList.add('classnone');
      item.style.display = 'block';
    }

  todos.addEventListener('click', () => {
    if(checksMarcados == 0){
      marcarCheck(todos);
      checks.forEach(item => {
        marcarCheck(item);
      });
      checksMarcados = checks.length;
  } else {
     desmarcarCheck(todos);
      checks.forEach(item => {
        desmarcarCheck(item); 
      });
    checksMarcados = 0; 
    }
  });


function desmarcaRadios(radioButtons) {
  radioButtons.forEach(radio => {
    radio.children[0].classList.remove('checkRadioButton');
  });
}

function tipo(ordem) {
  const item = document.getElementById('item' + ordem);
  document.getElementById('inputTipoCarne').value = item.innerHTML;
}

function dropdown(opcao) {
  const item = document.getElementsByClassName('dropdown')[0];
  item.style.display = estilosDisplay[opcao];

  setTimeout(() => {
    item.style.transform = 'translate(' + estilosTransicao[opcao] + ')';
  }, 0);
}

function validarForm(){
  const nomeValidado = validarNome();
  const emailValidado = validarEmail();
  const foneValidado = validarFone();
  const selectValidado = validarSelect();
  const msgValidada = validarMensag();
  const preferenciasValidadas = validarPreferencias();
  const checkValidado = validarCheck();

  if(nomeValidado && emailValidado && foneValidado && selectValidado && msgValidada && preferenciasValidadas && checkValidado) {
    alert('Formulário enviado com sucesso !!!!!');
  }
}

function adicionarCampoInvalido(campo){
  campo.classList.add('invalido');
  campo.nextElementSibling.classList.remove('classnone');
}

function removerCampoInvalido(campo){
  campo.classList.remove('invalido');
  campo.nextElementSibling.classList.add('classnone');
}

function validarNome(){
  const nome = document.getElementById('nome');
  if(nome.value.length == 0){
    adicionarCampoInvalido(nome);
    nome.nextElementSibling.innerText = '(*) Campo obrigatório';
  } else if(!nome.value.trim().includes(' ')){
    adicionarCampoInvalido(nome);
    nome.nextElementSibling.innerText = 'Informe seu sobrenome!';
  } else {
    removerCampoInvalido(nome);
    return true;
  }
  return false;
}
function validarEmail(){
  const email = document.getElementById('email');
  const result = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email.value);
  if(email.value.length == 0){
    adicionarCampoInvalido(email);
    email.nextElementSibling.innerText = '(*) Campo obrigatorio'
  } else if(!result){
    adicionarCampoInvalido(email);
    email.nextElementSibling.innerText = '(*) E-mail invalido'
    
  }else{
    removerCampoInvalido(email);
    return true;
  }
  return false;
}
function validarFone(){
  const telefone = document.getElementById('telefone');
  const validaFone = /^[0-9]{2}((9[0-9]{8}))$/.test(telefone.value);
  if(telefone.value.length == 0){
     adicionarCampoInvalido(telefone);
    telefone.nextElementSibling.innerText = '(*) Campo obrigatorio'
  } else if(!validaFone){
    adicionarCampoInvalido(telefone);
    telefone.nextElementSibling.innerText = '(*) Telefone invalido'
  }else{
    removerCampoInvalido(telefone);
    return true;
  }

  return false;
}
  

function validarPreferencias(){
  const radioButtons = document.querySelectorAll('.radioButton');
  let anyRadioChecked = false;
  radioButtons.forEach(radio => {
    const radioChecked = radio.children[0].classList.contains('checkRadioButton');

    if(radioChecked) {
      anyRadioChecked = true;
    }
  });
    const spanInvalidoCheck = document.getElementById('msgValidacaoRadio');
  const radioPainel = document.getElementById('radioPainel');

  if(!anyRadioChecked) {
    radioPainel.classList.add('invalido');
    spanInvalidoCheck.classList.remove('classnone');
    spanInvalidoCheck.innerText = '(*) Campo obrigatorio'
  } else {
    radioPainel.classList.remove('invalido');
    spanInvalidoCheck.classList.add('classnone');
    return true;
  }

  return false;
}

function validarCheck(){
   const checks = document.querySelectorAll('.check');
  let anyChecked = false;
  checks.forEach(check => {
    const checked = !check.children[0].classList.contains('classnone');

    if(checked) {
      anyChecked = true;
    }
  });
    const spanInvalidoCheck = document.getElementById('msgValidacaoCheck');
  const checkPainel = document.getElementById('checkPainel');

  if(!anyChecked) {
    checkPainel.classList.add('invalido');
    spanInvalidoCheck.classList.remove('classnone');
    spanInvalidoCheck.innerText = '(*) Campo obrigatorio'
  } else {
    checkPainel.classList.remove('invalido');
    spanInvalidoCheck.classList.add('classnone');
    return true;
  }

  return false;
}

function validarSelect(){  
  const select = document.getElementById('inputTipoCarne');
  if(select.value.length == 0){
     adicionarCampoInvalido(select);
    select.nextElementSibling.innerText = '(*) Campo obrigatorio'
  }else{
    removerCampoInvalido(select);
    return true;
  }

  return false;
}

function validarMensag(){
  const mensagem = document.getElementById('msg');
  if(mensagem.value.length == 0){
    adicionarCampoInvalido(mensagem);
    mensagem.nextElementSibling.innerText = '(*) Campo obrigatorio';
  }else if (mensagem.value.length < 5){
    adicionarCampoInvalido(mensagem);
    mensagem.nextElementSibling.innerText = '(*) min 5 caracteres';
  }else{
    removerCampoInvalido(mensagem);
    return true;
  }

  return false;
}