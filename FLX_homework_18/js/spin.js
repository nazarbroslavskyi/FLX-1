function spinner (target, action) {
  if (action === 'on') {
    target.style.display = 'block';
  } else if (action === 'off') {
    target.style.display = 'none';
  } else {
    console.error('Wrong args!');
  }
}