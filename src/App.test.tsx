import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';
import RecordShow from './Componets/RecordShow';

describe("<App />", () => {
  test('check input field exist or not', () => {
    const {getByText} = render(<App />);
    const TextField = screen.getByPlaceholderText(/Enter Counry Name/i);
    expect(TextField).toBeInTheDocument();
    expect(getByText(/submit/i).closest('button')).toBeInTheDocument();
  });

  test('first input field is blank', async  () => {
    const { getByText } = render(<App />);
    expect(getByText(/submit/i).closest('button')).toBeDisabled();
    const inputNode = screen.getByPlaceholderText('Enter Counry Name');
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: { value: 'india' } })
    expect(getByText(/submit/i).closest('button')).toBeEnabled();
    const button = getByText(/submit/i).closest('button');
    fireEvent.click(screen.getByText(/submit/i))
    await waitFor(() => {
      expect(screen.getByTestId('tb')).toBeInTheDocument();
    });
    expect(screen.getByTestId('tb')).toBeInTheDocument();
  });


  test('see the capital weather button',async () => {
    render(
      <MemoryRouter>
      <RecordShow/>
    </MemoryRouter>
    )
    expect(screen.getByText(/capital weather/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/capital weather/i))
    await waitFor(() => {
      expect(screen.getByTestId('weather_icon')).toBeInTheDocument();
    });
    expect(screen.getByTestId('weather_icon')).toBeInTheDocument();
  })

});