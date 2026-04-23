import { LIMITE_CREEPS, BODY_PADRAO } from './config';
import { mostrarSpawnando } from './visual';

export function gerenciarSpawn(spawn: StructureSpawn): void {
  mostrarSpawnando(spawn);

  if (spawn.spawning) return;

  const totalCreeps = Object.keys(Game.creeps).length;
  if (totalCreeps >= LIMITE_CREEPS) return;

  const nome = 'Creep' + Game.time;
  const resultado = spawn.spawnCreep(BODY_PADRAO, nome);

  if (resultado === OK) {
    console.log(`Spawnando: ${nome}`);
  }
}
