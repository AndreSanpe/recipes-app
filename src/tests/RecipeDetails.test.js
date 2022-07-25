import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App'
import RecipeDetails from '../pages/RecipeDetails';
import FoodsDetails from '../components/FoodsDetails';
// import FoodsDetails from '../components/FoodsDetails';

// const recipes = [
//   {
//     id: '52771',
//     type: 'food',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa a página de detalhes das receitas', () => {
  // afterEach(() => jest.clearAllMocks());
  it('Testa com a receita "spicy arrabiata penne"', async () => {
    const { history } = renderWithRouter(<App />);
    
    // const mealRecipe = [
    //   {
    //     id: '52771',
    //     type: 'food',
    //     nationality: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '23/06/2020',
    //     tags: ['Pasta', 'Curry'],
    //   }
    // ];
    
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mealRecipe),
    // });    
    
    
    // const inputEmail = screen.getByPlaceholderText(/email/i);
    // const inputSenha = screen.getByPlaceholderText(/password/i);
    // const btnEnter = screen.getByTestId("login-submit-btn");
    // userEvent.type(inputEmail, 'teste@trybe.com');
    // userEvent.type(inputSenha, '1234567');
    // userEvent.click(btnEnter);
    // userEvent.click(screen.getByRole('button', {  name: /search icon/i}));
    // userEvent.type(screen.getByRole('searchbox'), 'arrabiata');
    // userEvent.click(screen.getByText(/name/i));
    // userEvent.click(screen.getByRole('button', {  name: /buscar/i}));

    // expect(window.location.pathname).toBe('/foods/52771');
    // expect(global.fetch).toBeCalledTimes(1);

    history.push('/foods')

    // userEvent.click(screen.getByRole('button', {  name: /search icon/i}));
    // userEvent.type(screen.getByRole('searchbox'), 'arrabiata');
    // userEvent.click(screen.getByText(/name/i));
    // userEvent.click(screen.getByRole('button', {  name: /buscar/i}));

    // expect(window.location.pathname).toBe('/foods/52844');
    console.log(history.location.pathname);

    // testa título da receitascreen.
    const elTitle = screen.findByRole('heading', {  name: /Lasagne/i});
    // expect(elTitle).toBeInTheDocument();
    
    // testa "category" da receita
    const elCategory = screen.findByRole('heading', {  name: /vegetarian/i});
    // expect(elCategory).toBeInTheDocument();

    // testa se o vídeo está na tela com o título certo
    const video = screen.getByTitle(/spicy arrabiata penne/i);
    expect(video).toBeInTheDocument();

    // testa se uma lista de ingredientes está na tela
    const listIng = screen.getAllByRole('list');
    expect(listIng).toHaveLength(1);

    // testa imagens carroussel + imagem capa receita
    const imageList = screen.getAllByRole('img');
    expect(imageList).toHaveLength(7);

  
    // testa botão share
    const shareBtn = screen.getByRole('button', {  name: /share share/i});
    expect(shareBtn).toBeInTheDocument();
   
    userEvent.click(shareBtn);
    const linkCopied = await screen.findByRole('button', {  name: /link copied! share/i})
    expect(linkCopied).toBeInTheDocument();

    // testa botão favoritar
    const favoriteBtn =  screen.getByRole('button', {  name: /favoritar/i});
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn.getDOMNode().getAttribute('src')).toContain('whiteHeartIcon'); // https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a

    // favorita a receita
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.getDOMNode().getAttribute('src')).toContain('blackHeartIcon'); // https://stackoverflow.com/questions/41070895/how-do-i-get-an-attribute-of-an-element-nested-in-a-react-component-using-jest-a
    
    // espera que no localStorage contenha a receita favoritada 
    const favoriteListLocalStorage = localStorage.getItem('favoriteRecipes');
    expect(favoriteListLocalStorage).toContain('{id: "52771", type: "food", nationality: "Italian", category: "Vegetarian", alcoholicOrNot: "",…}');

    const logInPage = screen.getByPlaceholderText(/email/i);
    expect(logInPage).toBeInTheDocument();

    // testa se ao clicar no botão start ele muda a rota
    const startRecipeBtn = screen.getByRole('button', {  name: /start recipe/i});
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toContain('foods/52771/in-progress');
  })

  it('Testa clipboard botão share', async () => {
    const { history } = renderWithRouter(<App />)
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { },
      },
    });

    jest.spyOn(navigator.clipboard, 'writeText')

    // fonte: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest

    // const shareIcons = await screen.findAllByAltText('share icon')
    // userEvent.click(shareIcons[0])

    // expect(navigator.clipboard.writeText).toHaveBeenCalled()
  })
})