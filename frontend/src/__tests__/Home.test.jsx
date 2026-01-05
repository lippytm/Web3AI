import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthProvider } from '../context/AuthContext';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to Web3AI/i)).toBeDefined();
  });
});
