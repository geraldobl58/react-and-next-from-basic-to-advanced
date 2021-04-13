import userEvent from '@testing-library/user-event';
import { Button } from '.';
const { render, screen } = require("@testing-library/react");

describe('<Button />', () => {
  const fn = jest.fn();

  it('should render the button with the text "Carregar mais"', () => {
    render(<Button text="Carregar mais" onClickPosts={fn}  />);

    const button = screen.getByRole('button', { name: /Carregar mais/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();

    render(<Button text="Carregar mais" onClickPosts={fn} />);

    const button = screen.getByRole('button', { name: /Carregar mais/i });

    userEvent.click(button)

    expect(fn).toHaveBeenCalledTimes(1);

  });

  it('should be disabled when disabled is true', () => {    
    const fn = jest.fn();

    render(<Button text="Carregar mais" disabled={true} onClickPosts={fn} />);

    const button = screen.getByRole('button', { name: /Carregar mais/i });

    expect(button).toBeDisabled();

  });

  it('should be disabled when disabled is false', () => {
    const fn = jest.fn();

    render(<Button text="Carregar mais" disabled={false} onClickPosts={fn} />);

    const button = screen.getByRole('button', { name: /Carregar mais/i });

    expect(button).toBeEnabled();

  });

  it('should match snapshot', () => {
    const fn = jest.fn();

    const { container } = render(
      <Button text="Carregar mais" disabled={false} onClickPosts={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
})