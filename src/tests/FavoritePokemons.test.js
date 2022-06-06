import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import data from '../data';

describe('Testa o component <FavoritePokemons.js />', () => {
  it('Testa se é exibida mensagem específica se não tem pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  it('Testa se são exibidos os cards dos pokemon favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    data.forEach((pokemon) => {
      const pokemonName = screen.getByText(`${pokemon.name}`);
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
