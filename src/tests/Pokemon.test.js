import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokémon', () => {
  it('Testa se é renderizado o card com as informações do Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const image = screen.getByAltText('Pikachu sprite');
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    expect(image.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Testa se o card renderiza o link e redireciona para página de infos', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const pokemonLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(pokemonLink);

    const { location: { pathname } } = history;

    const { id } = pokemons[0];

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se os favoritos possuem a estrela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const star = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);

    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
