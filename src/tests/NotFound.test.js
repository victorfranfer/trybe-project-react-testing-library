import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o component <NotFound.js />', () => {
  it('Testa se a página contém um heading h2 com o texto Page request not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen
      .getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem do Pikachu triste', () => {
    renderWithRouter(<NotFound />);
    const pikachuImageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuImage = screen.getByRole('img', { name: /pikachu crying/i });

    expect(pikachuImage.src).toBe(pikachuImageURL);
  });
});
