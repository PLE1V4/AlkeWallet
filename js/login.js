const demoUser = {
  name: 'Demo User',
  username: 'demo',
  password: '123456',
  balance: 0,
};

const transactions = [
  {
    amount: 50000,
    desc: 'Transferencia a Armando',
    to: 'Armando Casas',
    tipo: 1,
  },
  {
    amount: 7500,
    desc: 'Menu Hamburguesa 2',
    to: 'DeliBurger',
    tipo: 1,
  },
  {
    amount: 15000,
    desc: 'cuota cumpleaños',
    to: 'Freddy Turbina',
    tipo: 1,
  },
  {
    amount: 2000,
    desc: 'Compra Mall Chino',
    to: 'Lin kuei SpA.',
    tipo: 1,
  },
  {
    amount: 300000,
    desc: 'Recarga de Saldo',
    to: 'Cuenta Personal',
    tipo: 0,
  },
  {
    amount: 25000,
    desc: 'Entradas Teatro',
    to: 'Centro Cultural la Moneda',
    tipo: 1,
  },
];

const contacts = [
  { nombre: 'Armando Casas', cuenta: 123456, alias: 'Armando' },
  { nombre: 'Freddy Turbina', cuenta: 234567, alias: 'Freddy' },
  { nombre: 'Lin Kuei SpA', cuenta: 345678, alias: 'Mall Chino' },
  { nombre: 'DeliBurger', cuenta: 456789, alias: 'Hamburguesas' },
  { nombre: 'Centro Cultural la Moneda', cuenta: 567890, alias: 'CCLM' },
];

const user = $('#loginUser');
const pass = $('#loginPassword');
const formulario = $('#loginForm');
const alerta = $('#alertLogin');
const helpUser = $('#userMessage');
const helpPassword = $('#pwdMessage');

formulario.on('submit', (event) => {
  event.preventDefault();
  user.removeClass('is-invalid');
  pass.removeClass('is-invalid');
  login();
});

function login() {
  if (user.val() && pass.val()) {
    if (user.val() === demoUser.username && pass.val() === demoUser.password) {
      loginExitoso();
      inicializarData();
      setTimeout(() => {
        $(location).attr('href', 'html/menu.html');
      }, 1000);
    } else {
      if (
        user.val() !== demoUser.username ||
        pass.val() !== demoUser.password
      ) {
        loginFallido('Credenciales Erroneas');
      }
    }
  } else {
    if (!user.val()) {
      user.addClass('is-invalid');
      helpUser.html('Debe ingreser un nombre de Usuario');
    }

    if (!pass.val()) {
      pass.addClass('is-invalid');
      helpPassword.html('Debe Ingrear una contraseña');
    }
  }
}

function inicializarData() {
  localStorage.setItem('user', JSON.stringify(demoUser));
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loginExitoso() {
  alerta.removeClass('alert-danger');
  alerta.addClass('alert-success');
  alerta.show();
  alerta.html('Login Exitoso, Redirigiendo....');
}

function loginFallido(message) {
  alerta.removeClass('alert-success');
  alerta.addClass('alert-danger');
  alerta.show();
  alerta.html(message);
}
