'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      const usuarioId = await login(codigo);
      localStorage.setItem('usuarioId', String(usuarioId));
      router.push('/dashboard');
    } catch (err) {
      setErro('Código inválido ou erro no servidor');
    }
  }

  return (
    <main className="bg-background text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-card p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-primary">Controle de Ponto</h1>
        <input
          type="text"
          placeholder="Digite seu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full px-4 py-2 rounded bg-background border border-border mb-4 focus:outline-none focus:ring focus:ring-primary"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-blue-500 text-white py-2 rounded font-semibold"
        >
          Entrar
        </button>
        {erro && <p className="text-red-500 mt-2">{erro}</p>}
      </div>
    </main>
  );
}