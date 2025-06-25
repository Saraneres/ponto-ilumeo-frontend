'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    iniciarTurno,
    finalizarTurno,
    listarTurnos,
} from '@/lib/api';
import { LogOut, Play, Square, Clock } from 'lucide-react';

type Turno = {
    id: number;
    inicio: string;
    fim: string | null;
    criadoEm: string;
    usuarioId: number;
};

export default function DashboardPage() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedId = localStorage.getItem('usuarioId');
        if (storedId) {
            const id = Number(storedId);
            setUsuarioId(id);
            carregarTurnos(id);
        } else {
            router.push('/');
        }
    }, [router]);

    async function carregarTurnos(id: number) {
        try {
            const dados = await listarTurnos();
            const doUsuario = dados.filter((t: Turno) => t.usuarioId === id);
            setTurnos(doUsuario);
        } catch (error) {
            console.error('Erro ao carregar turnos:', error);
        }
    }

    async function handleIniciarTurno() {
        if (!usuarioId) return;
        await iniciarTurno(usuarioId);
        await carregarTurnos(usuarioId);
    }

    async function handleFinalizarTurno(id: number) {
        await finalizarTurno(id);
        if (usuarioId) await carregarTurnos(usuarioId);
    }

    function calcularHorasTotais() {
        let total = 0;
        const hoje = new Date().toDateString();

        turnos.forEach((t) => {
            const dataInicio = new Date(t.inicio);
            const dataFim = t.fim ? new Date(t.fim) : null;

            if (dataInicio.toDateString() === hoje && dataFim) {
                const diff = dataFim.getTime() - dataInicio.getTime();
                total += diff;
            }
        });

        const horas = Math.floor(total / 3600000);
        const minutos = Math.floor((total % 3600000) / 60000);
        return `${horas}h ${minutos}min`;
    }

    const turnoAberto = turnos.find((t) => t.fim === null);

    return (
        <main className="min-h-screen bg-[#0D1117] text-white px-6 py-10">
            {/* BARRA SUPERIOR */}
            <header className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold">Controle de Ponto</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('usuarioId');
                        router.push('/');
                    }}
                    className="text-red-400 hover:underline flex items-center gap-1"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </header>

            {/* STATUS */}
            <section className="max-w-4xl mx-auto mb-8 text-center">
                <p className="mb-2 text-lg">Usuário logado: <strong>#{usuarioId}</strong></p>
                <div className="text-lg flex justify-center items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Total de hoje:</span> <strong>{calcularHorasTotais()}</strong>
                </div>
            </section>

            {/* BOTÕES */}
            <div className="flex justify-center gap-4 mb-8">
                {!turnoAberto ? (
                    <button
                        onClick={handleIniciarTurno}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded inline-flex items-center"
                    >
                        <Play className="w-4 h-4 mr-2" /> Iniciar Turno
                    </button>
                ) : (
                    <button
                        onClick={() => handleFinalizarTurno(turnoAberto.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded inline-flex items-center"
                    >
                        <Square className="w-4 h-4 mr-2" /> Finalizar Turno
                    </button>
                )}
            </div>

            {/* TURNOS */}
            <section className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-primary">Turnos Recentes</h2>
                <div className="flex flex-col gap-3">
                    {turnos.map((turno) => (
                        <div
                            key={turno.id}
                            className="bg-card rounded-lg p-4 shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm text-gray-300 mb-1">
                                    <strong>{new Date(turno.criadoEm).toLocaleDateString()}</strong>
                                </p>
                                <p>
                                    Entrada:{' '}
                                    <span className="text-green-400">
                                        {new Date(turno.inicio).toLocaleTimeString()}
                                    </span>
                                </p>
                            </div>
                            <div>
                                {turno.fim ? (
                                    <p>
                                        Saída:{' '}
                                        <span className="text-red-400">
                                            {new Date(turno.fim).toLocaleTimeString()}
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-yellow-400">⏳ Em andamento</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
