export function mostrarSpawnando(spawn: StructureSpawn): void {
  if (!spawn.spawning) return;

  const creep = Game.creeps[spawn.spawning.name];
  spawn.room.visual.text('🔄 ' + creep.name, spawn.pos.x + 1, spawn.pos.y, {
    align: 'left',
  });
}
