describe('#CreateCategory', () => {
  it('should be able to create a new category', async () => {
    const response = await global.testRequest
      .post('/api/v1/categories')
      .send({
        name: 'name category test',
        description: 'description category test'
      })
      .set({
        Authorization: `Bearer ${global.session.token}`
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with a name that exists', async () => {
    const response = await global.testRequest
      .post('/api/v1/categories')
      .send({
        name: 'name category test',
        description: 'description category test'
      })
      .set({
        Authorization: `Bearer ${global.session.token}`
      });

    expect(response.status).toBe(409);
  });
});
