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
      cy.window().then(win => win.sessionStorage.clear())
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.reload()
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('When there are multiple blogs', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('button', 'new blog').click()
      cy.get('#title-input').type('Blog 1')
      cy.get('#author-input').type('Author 1')
      cy.get('#url-input').type('Url 1')
      cy.get('#create-blog-button').click()
      cy.contains('button', 'new blog').click()
      cy.get('#title-input').type('Blog 2')
      cy.get('#author-input').type('Author 2')
      cy.get('#url-input').type('Url 2')
      cy.get('#create-blog-button').click()
      cy.contains('button', 'new blog').click()
      cy.get('#title-input').type('Blog 3')
      cy.get('#author-input').type('Author 3')
      cy.get('#url-input').type('Url 3')
      cy.get('#create-blog-button').click()
    })

    it('The blogs are presented in order with the highest likes on top', function() {
      cy.get('.view-button').eq(1).click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()
      cy.get('.like-button').click()
      cy.get('.hide-button').click()
      cy.get('.view-button').eq(2).click()
      cy.get('.like-button').click()
      cy.get('.hide-button').click()
      cy.get('.blog').eq(0).should('contain', 'Blog 2')
      cy.get('.blog').eq(1).should('contain', 'Blog 3')
      cy.get('.blog').eq(2).should('contain', 'Blog 1')
    })
  })
})
