import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente <About.js />', () => {
  it('Testa se a página contém um heading <h2> com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/this application simulates a pokédex/i);
    const paragraph2 = screen.getByText(/one can filter pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img', { name: /Pokédex/i });

    expect(pokedexImage.src).toBe(imageURL);
  });
});
