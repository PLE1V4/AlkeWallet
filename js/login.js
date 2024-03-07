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
  { nombre: 'Lin Kuei', cuenta: 345678, alias: 'Mall Chino' },
  { nombre: 'DeliBurger', cuenta: 456789, alias: 'Hamburguesas' },
  { nombre: 'Centro Cultural la Moneda', cuenta: 567890, alias: 'CCLM' },
];

const user = $('#loginUser');
const pass = $('#loginPassword');
const formulario = $('#loginForm');

formulario.on('submit', (event) => {
  event.preventDefault();
  login();
});

function login() {
  if (user.val() === demoUser.username && pass.val() === demoUser.password) {
    inicializarData();
    $(location).attr('href', 'html/menu.html');
  } else {
    alert('Credenciales Erroneas');
  }
}

function inicializarData() {
  localStorage.setItem('user', JSON.stringify(demoUser));
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
