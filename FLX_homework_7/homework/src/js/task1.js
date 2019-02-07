const login = prompt('Enter your login');

if (login === 'User' || login === 'Admin') {
  const password = prompt('Enter your password');

  if (password === 'UserPass') {
    alert(new Date().getHours() < 20 
    ? 'Good day, dear User!'
    : 'Good evening, dear dear User!');
  } else if (password === 'RootPass') {
    alert(new Date().getHours() < 20 
    ? 'Good day, dear Admin!'
    : 'Good evening, dear dear Admin!');
  } else if (password === '' || password === null) {
    alert('Canceled.');
  } else {
    alert('Wrong password');
  }
} else if (login === '' || login === null) {
  alert('Canceled.');
} else if (login.length < 4) {
  alert(`I don't know any users having name length less than 4 symbols`);
} else {
  alert(`I don’t know you`);
}
