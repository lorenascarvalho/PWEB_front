

export function formataStatus(status) {
    switch(status) {
        case 'ABERTO':    return 'Em Aberto';
        case 'FECHADO': return 'Fechado'; 
        case 'DESCONHECIDO':     return 'Desconhecido';
        case 'SUSPENSO':     return 'Suspenso';
        case 'PENDENTE':     return 'Pendente';
    }
}