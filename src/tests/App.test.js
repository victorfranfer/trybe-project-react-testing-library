import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js>', () => {
  it('Verifica se o topo contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /home/i });
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonLink).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link <Home>, redireciona para URL /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar no link <About>, redireciona para URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Ao clicar no link <Favorite Pokémons>, redireciona para URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favPokemonLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Ao entrar URL desconhecida, redireciona para /not-found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notFound = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });

    expect(notFound).toBeInTheDocument();
  });
});
