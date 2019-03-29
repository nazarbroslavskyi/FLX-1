function getFoo() {
  return new Promise(function (resolve, reject) {
    resolve('foo');
  });
}

function run(generator) {
  let it = generator();

  function go(resault) {
    if (resault.done) {
      return resault.value;
    }

    return resault.value.then(function (value) {
      return go(it.next(value));
    }, function (e) {
      return go(it.throw(e));
    });
  }

  go(it.next());
}

run(function* () {
  try {
    let foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
});