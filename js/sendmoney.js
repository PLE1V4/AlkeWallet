let user = JSON.parse(localStorage.getItem('user'));
let contacts = JSON.parse(localStorage.getItem('contacts'));
let transactions = JSON.parse(localStorage.getItem('transactions'));

const lblSaldo = $('#lblAvailable');
const btnBack = $('.btnBack');
const btnAddContact = $('#btnAddContact');
const btnCerrarAdd = $('#btnCloseAdd');
const formSent = $('#formSentMoney');
const formAdd = $('#formAddContact');
const cantidad = $('#txtSentMoney');
const mensaje = $('#txtTransferMessage');
const listaContactos = $('#divContactos');
const divAgregarContacto = $('#divAddContact');
const nombreContacto = $('#txtAddName');
const cuentaContacto = $('#txtAddAccount');
const aliasContacto = $('#txtAddAlias');

btnBack.on('click', function () {
  $(location).attr('href', 'menu.html');
});

formSent.on('submit', function (event) {
  event.preventDefault();
  sentMoney();
});

formAdd.on('submit', function (event) {
  event.preventDefault();
  agregarContacto();
});

btnAddContact.on('click', function () {
  divAgregarContacto.show();
});

btnCerrarAdd.on('click', function () {
  divAgregarContacto.hide();
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
  let body = '';
  if (contacts) {
    contacts.forEach((element) => {
      body +=
        '<input type="radio" name="radContacts" value="' +
        element.nombre +
        '" id="' +
        element.cuenta +
        '"><label>' +
        element.cuenta +
        '</label><label>' +
        element.alias +
        '</label>';
    });
  } else {
    body = '<span>No hay Contactos Registrados</span>';
  }

  listaContactos.html(body);
}

function registrarTransferencia(cantidad) {
  user.balance -= cantidad;
  setAvisoSaldo(lblSaldo, user.balance);
  localStorage.setItem('user', JSON.stringify(user));
  transactions.push({
    amount: cantidad,
    desc: mensaje.val(),
    to: $("input[name='radContacts']:checked").val(),
    tipo: 1,
  });
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function agregarContacto() {
  contacts.push({
    nombre: nombreContacto.val(),
    cuenta: parseInt(cuentaContacto.val()),
    alias: aliasContacto.val(),
  });
  cargarContactos();
  $(`#${cuentaContacto.val()}`).prop('checked', true);
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
