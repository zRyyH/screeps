const _estado: Record<string, string> = {};

export function log(creep: Creep, acao: string): void {
  if (_estado[creep.name] === acao) return; // só loga quando muda
  _estado[creep.name] = acao;
  console.log(`[${creep.name}] ${acao}`);
}
