/* eslint-disable no-undef */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.'

const handler = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(ctx.json([
      {
        userId: 1,
        id: 1,
        title: "Title 1",
        body: "Body 1",
        url: 'img1.jpg'
      },
      {
        userId: 2,
        id: 2,
        title: "Title 2",
        body: "Body 2",
        url: 'img2.jpg'
      },
      {
        userId: 3,
        id: 3,
        title: "Title 3",
        body: "Body 3",
        url: 'img3.jpg'
      }
    ]));
  })
];

const server = setupServer(...handler);

describe('<Home />', () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Whoops: não existe posts no momento! 😭');
  
    
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/i);
    expect(search).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Carregar mais/i });
    expect(button).toBeInTheDocument();
  });
});