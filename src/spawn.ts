import { LIMITE_CREEPS, BODY_PADRAO, BODY_BUILDER, RATIO_BUILDERS } from './config';
import { mostrarSpawnando } from './visual';

export function gerenciarSpawn(spawn: StructureSpawn): void {
  mostrarSpawnando(spawn);

  if (spawn.spawning) return;

  const totalCreeps = Object.keys(Game.creeps).length;
  if (totalCreeps >= LIMITE_CREEPS) return;

  const temObras = spawn.room.find(FIND_MY_CONSTRUCTION_SITES).length > 0;
  const builders = Object.values(Game.creeps).filter(
    (c) => Memory.creeps[c.name]?.role === 'builder'
  ).length;
  const maxBuilders = Math.floor(totalCreeps * RATIO_BUILDERS);

  const role =
    temObras && builders < maxBuilders && builders < Math.max(1, maxBuilders)
      ? 'builder'
      : 'harvester';
  const body = role === 'builder' ? BODY_BUILDER : BODY_PADRAO;
  const nome = role === 'builder' ? 'Builder' + Game.time : 'Creep' + Game.time;

  const resultado = spawn.spawnCreep(body, nome, { memory: { role, construindo: false } });
  if (resultado === OK) {
    console.log(`Spawnando ${role}: ${nome}`);
  }
}
