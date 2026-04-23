export function limparCreepsMortos(): void {
  for (const nome in Memory.creeps) {
    if (!Game.creeps[nome]) delete Memory.creeps[nome];
  }
}
