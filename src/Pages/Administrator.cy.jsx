import React from 'react'
import Administrator from './Administrator'

describe('<Administrator />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Administrator />)
  })
})