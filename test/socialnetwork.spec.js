describe('Create account with email and password', () => {
  it('Must return true with email and password', () => {
    const email = 'test@test.com';
    const password = '123456';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result, true);
  });

  it('Must return false with email and empty password', () => {
    const email = 'test@test.com';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result, false);
  });

  it('Must return false with empty email and password', () => {
    const email = '';
    const password = '12345678';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result, false);
  });

  it('Must return false with empty email and empty password', () => {
    const email = '';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result, false);
  });
});