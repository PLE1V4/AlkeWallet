let user = JSON.parse(localStorage.getItem('user'));
let transactions = JSON.parse(localStorage.getItem('transactions'));

const saldo = $('#lblAvisoSaldo');
const back = $('.btnBack');
const deposit = $('#formDeposit');
const cantidad = $('#txtAmount');

back.on('click', function () {
  $(location).attr('href', 'menu.html');
});

deposit.on('submit', function (event) {
  event.preventDefault();
  agregarSaldo();
});

$(document).ready(function () {
  setAvisoSaldo(saldo, user.balance);
});

function setAvisoSaldo(element, saldo) {
  element.text(`Saldo Actual en la Cuenta: ${saldo}`);
}

function agregarSaldo() {
  num = parseInt(cantidad.val());
  if (!isNaN(num) && num > 0) {
    registrarDeposito(num);
  } else if (!isNaN(num) && num === 0) {
    alert('El Monto tiene que ser mayor a 0');
  } else {
    alert('Datos no válidos');
  }
}

function registrarDeposito(cantidad) {
  user.balance += cantidad;
  localStorage.setItem('user', JSON.stringify(user));
  setAvisoSaldo(saldo, user.balance);
  transactions.push({
    amount: cantidad,
    desc: 'Recarga de Saldo',
    to: 'Cuenta Personal',
    tipo: 0,
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
