import { render, screen } from '@testing-library/react';

import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
      cover: 'img/img1.png'
    },
    {
      id: 2,
      title: 'Title 2',
      body: 'Body 2',
      cover: 'img/img2.png'
    },
    {
      id: 3,
      title: 'Title 3',
      body: 'Body 3',
      cover: 'img/img3.png'
    }
  ]
}

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /Title /i }))
      .toHaveLength(3);

    expect(screen.getAllByRole('img', { name: /Title /i }))
      .toHaveLength(3);

    expect(screen.getAllByText(/Body/i))
      .toHaveLength(3);

    expect(screen.getByRole('img', { name: /Title 3/i }))
      .toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render posts', () => {
    render(<Posts />);

    expect(screen.queryByRole('heading', { name: /Teste/i }))
      .not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});