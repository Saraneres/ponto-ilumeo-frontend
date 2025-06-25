import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../src/app/page';

// Mock do useRouter
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

describe('LoginPage', () => {
    beforeEach(() => {
        // Limpa localStorage antes de cada teste
        localStorage.clear();
    });

    test('deve renderizar o título e o campo de código', () => {
        render(<LoginPage />);
        expect(screen.getByText('Controle de Ponto')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite seu código')).toBeInTheDocument();
    });
});