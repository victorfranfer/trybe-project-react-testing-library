import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component <Pokedex />', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo pokémon ao clicar no botão Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    const firstPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(buttonNext);

    const secondPokemon = screen.getByAltText(/charmander sprite/i);
    expect(secondPokemon).toBeInTheDocument();
  });

  it('Testa se a tela possui todos os botões de tipos', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const allTypes = pokemons.reduce((types, { type }) => [...types, type], [])
      .filter((type, index, self) => self.indexOf(type) === index);

    allTypes.forEach((type, index) => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      expect(buttonType[index]).toBeInTheDocument();
      expect(buttonType[index]).toHaveTextContent(type);
    });
  });

  it('Testa se o botão filtra os pokémon renderizados', () => {
    renderWithRouter(<App />);
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');

    buttonTypes.forEach((buttonType) => {
      userEvent.click(buttonType);
      pokemons.forEach(({ type, name }) => {
        if (type === buttonType.textContent) {
          expect(screen.getByText(name)).toBeInTheDocument();
          userEvent.click(screen.getByTestId(/next-pokemon/i));
        } else {
          expect(screen.queryByText(name)).not.toBeInTheDocument();
        }
      });
    });
  });

  it('Testa se existe o button All para resetar os filtros', () => {
    renderWithRouter(<App />);
    const allTypesButton = screen.getByRole('button', { name: /all/i });
    expect(allTypesButton).toBeInTheDocument();

    userEvent.click(allTypesButton);
    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
