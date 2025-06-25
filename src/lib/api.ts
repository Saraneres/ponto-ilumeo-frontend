

export async function login(codigo: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
    });

    if (!res.ok) throw new Error('Login falhou');
    const data = await res.json();
    return data.usuarioId;
}

export async function listarTurnos() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/turnos`);
    return res.json();
}

export async function iniciarTurno(usuarioId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/turnos/inicio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId }),
    });
    return res.json();
}

export async function finalizarTurno(turnoId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/turnos/fim/${turnoId}`, {
        method: 'PATCH',
    });

    if (!res.ok) throw new Error('Erro ao finalizar turno');
    return res.json();
}