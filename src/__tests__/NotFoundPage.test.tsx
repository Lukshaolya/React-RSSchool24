import NotFoundPage from '../containers/NotFoundPage/NotFoundPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';
import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('NotFoundPage', () => {
  const mockedNavigate = jest.fn();
  const mockedLocation = {
    pathname: '/non-existent-page',
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockedLocation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the NotFoundPage with correct text and elements', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        'It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('No match for')).toBeInTheDocument();
    expect(screen.getByText('/non-existent-page')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /to Main Page/i }),
    ).toBeInTheDocument();
  });

  test('navigates back when the button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /to Main Page/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
