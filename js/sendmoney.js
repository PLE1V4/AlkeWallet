let user = JSON.parse(localStorage.getItem('user'));
let contacts = JSON.parse(localStorage.getItem('contacts'));
let transactions = JSON.parse(localStorage.getItem('transactions'));

const lblSaldo = $('#lblAvailable');
const btnBack = $('.btnBack');
const formSent = $('#formSentMoney');
const cantidad = $('#txtSentMoney');
const listaContactos = $('#divContactos');

btnBack.on('click', function () {
  $(location).attr('href', 'menu.html');
});

formSent.on('submit', function (event) {
  event.preventDefault();
  sentMoney();
});

$(document).ready(function () {
  setAvisoSaldo(lblSaldo, user.balance);
  cargarContactos();
});

function setAvisoSaldo(element, saldo) {
  element.text(`Monto Maximo de Transferencia: ${saldo}`);
}

function sentMoney() {
  const num = parseInt(cantidad.val());

  if (!isNaN(num) && num > 0 && num <= user.balance) {
    registrarTransferencia(num);
  } else if (!isNaN(num) && num === 0) {
    alert('El monto a Transferir no puede ser 0');
  } else if (!isNaN(num) && num > 0 && num > user.balance) {
    alert('el monto a transferir no puede execeder al monto en su cuenta');
  } else {
    alert('datos no validos');
  }
}

function cargarContactos() {
  let tbody = '<table>';
  contacts.forEach((element) => {
    tbody +=
      '<tr><label>' +
      element.alias +
      '</label><label>' +
      element.nombre +
      '</label><label>' +
      element.cuenta +
      '</label></tr>';
  });
  tbody += '</table>';
  listaContactos.html(tbody);
}

function registrarTransferencia(cantidad) {
  user.balance -= cantidad;
  setAvisoSaldo(lblSaldo, user.balance);
  localStorage.setItem('user', JSON.stringify(user));
  transactions.push({
    amount: cantidad,
    desc: 'desc',
    to: 'cuenta destino',
    tipo: 1,
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
