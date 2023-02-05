import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../pages/PokemonDetails';
import pokemons from '../data';

describe('Testa a página PokemonDetails', () => {
  const trueBool = true;
  beforeEach(() => renderWithRouter(<PokemonDetails
    match={ { params: { id: '25' } } }
    pokemons={ pokemons }
    isPokemonFavoriteById={ { id: trueBool } }
    onUpdateFavoritePokemons={ () => {} }
  />));
  it('Testa se a página possui o nome do Pokemon', () => {
    const { name } = pokemons;
    const title = screen.getByText(`${name} Details`);
    const heading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(title).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
