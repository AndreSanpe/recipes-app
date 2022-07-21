import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App'
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

  // Object.assign(navigator, {
  //   clipboard: {
  //     writeText: () => {},
  //   },
  // });

describe('Testa a page DoneRecipes', () => {
it('Testa com food', async () => {
    const { history } = renderWithRouter(<DoneRecipes />)
    const doneRecipes = [
        {
          id: '52771',
          type: 'food',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          doneDate: '23/06/2020',
          tags: ['Pasta', 'Curry'],
        },
        {
          id: '178319',
          type: 'drink',
          nationality: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
          doneDate: '23/06/2020',
          tags: [],
        },
      ];
    // Object.defineProperty(navigator, 'clipboard', {
    //     writeText: jest.fn(),
    // });
    


    

const allButton = screen.getByRole('button', { name: /all/i})
const foodButton = screen.getByRole('button', { name: /food/i})
const drinksButton = screen.getByRole('button', { name: /drinks/i})
const shareIcons = await screen.findAllByAltText('share icon')
const cardImages = await screen.findAllByAltText('receipt-card')

userEvent.click(cardImages[0])

expect(history.location.pathname).toBe('/foods/:52771')


history.push('/done-recipes')

userEvent.click(cardImages[1])
expect(history.location.pathname).toBe('/drinks/:178319')

history.push('/done-recipes')

userEvent.click(foodButton)

expect(cardImages[0]).toBeInTheDocument()

userEvent.click(allButton)

expect(cardImages[0]).toBeInTheDocument()

userEvent.click(drinksButton)

// expect(cardImages[0]).not.toBeInTheDocument()

userEvent.click(allButton)
})
it('Testa clipboard', async () => {
  const { history } = renderWithRouter(<DoneRecipes />)
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  jest.spyOn(navigator.clipboard, 'writeText')

  // fonte: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

  const shareIcons = await screen.findAllByAltText('share icon')
  userEvent.click(shareIcons[0])

  expect(navigator.clipboard.writeText).toHaveBeenCalled()
})
})