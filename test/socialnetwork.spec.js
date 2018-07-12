// test función window.controller.validateLogin
describe('Create account with email and password', () => {
  it('Must return true with email and password', () => {
    const email = 'test@test.com';
    const password = '123456';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, true);
    assert.equal(result.message, '');
  });

  it('Must return false with email and empty password', () => {
    const email = 'test@test.com';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'No debe dejar campos vacíos');
  });

  it('Must return false with empty email and password', () => {
    const email = '';
    const password = '12345678';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'No debe dejar campos vacíos');
  });

  it('Must return false with empty email and empty password', () => {
    const email = '';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'No debe dejar campos vacíos');
  });

  it('Must return false with email and password with less than 6 characters', () => {
    const email = 'test@test.com';
    const password = '123';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'La contraseña debe contener minimo 6 caracteres');
  });

  it('Must return false with non format mail', () => {
    const email = 'test.com';
    const password = '123';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Debe ingresar un mail valido');
  });
});