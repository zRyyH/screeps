// Estruturas esperadas por nível de RCL (além do spawn que já existe)
const ESTRUTURAS_POR_RCL: Partial<Record<BuildableStructureConstant, number[]>> = {
  [STRUCTURE_EXTENSION]: [0, 0, 5, 10, 20, 30, 40, 50],
  [STRUCTURE_TOWER]: [0, 0, 0, 1, 2, 3, 4, 6],
  [STRUCTURE_STORAGE]: [0, 0, 0, 0, 1, 1, 1, 1],
  [STRUCTURE_TERMINAL]: [0, 0, 0, 0, 0, 0, 1, 1],
  [STRUCTURE_LAB]: [0, 0, 0, 0, 0, 3, 6, 10],
  [STRUCTURE_LINK]: [0, 0, 0, 0, 0, 2, 3, 6],
};

export function planejarConstrucao(room: Room): void {
  const rcl = room.controller?.level ?? 0;
  const spawn = room.find(FIND_MY_SPAWNS)[0];
  if (!spawn) return;

  const sitesExistentes = room.find(FIND_MY_CONSTRUCTION_SITES);
  if (sitesExistentes.length >= 5) return; // não empilha obras

  for (const [tipo, limites] of Object.entries(ESTRUTURAS_POR_RCL) as [
    BuildableStructureConstant,
    number[],
  ][]) {
    const limite = limites[rcl] ?? 0;
    if (limite === 0) continue;

    const existentes = room.find(FIND_MY_STRUCTURES, {
      filter: (s) => s.structureType === tipo,
    }).length;
    const emObra = sitesExistentes.filter((s) => s.structureType === tipo).length;
    const total = existentes + emObra;

    if (total >= limite) continue;

    const pos = encontrarPosicao(room, spawn.pos, tipo);
    if (pos) {
      const resultado = room.createConstructionSite(pos.x, pos.y, tipo);
      if (resultado === OK) {
        console.log(`[Planner] Marcando obra: ${tipo} em (${pos.x},${pos.y}) RCL${rcl}`);
      }
    }
  }
}

function encontrarPosicao(
  room: Room,
  origem: RoomPosition,
  tipo: BuildableStructureConstant
): RoomPosition | null {
  const raios = tipo === STRUCTURE_EXTENSION ? 3 : 5;

  for (let raio = 1; raio <= raios + 4; raio++) {
    for (let dx = -raio; dx <= raio; dx++) {
      for (let dy = -raio; dy <= raio; dy++) {
        if (Math.abs(dx) !== raio && Math.abs(dy) !== raio) continue;
        const x = origem.x + dx;
        const y = origem.y + dy;
        if (x < 2 || x > 47 || y < 2 || y > 47) continue;

        const pos = room.getPositionAt(x, y);
        if (!pos) continue;

        const terreno = room.getTerrain().get(x, y);
        if (terreno === TERRAIN_MASK_WALL) continue;

        const obstaculo =
          pos.lookFor(LOOK_STRUCTURES).length > 0 ||
          pos.lookFor(LOOK_CONSTRUCTION_SITES).length > 0;
        if (obstaculo) continue;

        return pos;
      }
    }
  }
  return null;
}
