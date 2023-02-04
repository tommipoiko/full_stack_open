describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'root',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Blogin nimi')
      cy.get('#author-input').type('Kirjailijan nimi')
      cy.get('#url-input').type('http://www.pikkukakkonen.fi')
      cy.get('#create-blog-button').click()
      cy.contains('Blogin nimi -written by- Kirjailijan nimi')
    })
  })

  describe('When logged in user has created a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title-input').type('Blogin nimi')
      cy.get('#author-input').type('Kirjailijan nimi')
      cy.get('#url-input').type('http://www.pikkukakkonen.fi')
      cy.get('#create-blog-button').click()
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Blogin nimi -written by- Kirjailijan nimi').should('not.exist')
    })

    it('Another user can not delete the blog', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
    })
  })
})
