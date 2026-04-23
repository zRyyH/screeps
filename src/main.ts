import { SPAWN_NAME } from './config';
import { limparCreepsMortos } from './memory';
import { gerenciarSpawn } from './spawn';
import { rodarHarvester } from './harvester';
import { rodarBuilder } from './builder';
import { planejarConstrucao } from './planner';

export const loop = function (): void {
  limparCreepsMortos();

  const spawn = Game.spawns[SPAWN_NAME];
  if (!spawn) return;

  planejarConstrucao(spawn.room);
  gerenciarSpawn(spawn);

  for (const nome in Game.creeps) {
    const creep = Game.creeps[nome];
    if (!Memory.creeps[nome]) Memory.creeps[nome] = { role: 'harvester' };
    const mem = Memory.creeps[nome];
    if (!mem.role) mem.role = 'harvester';

    if (mem.role === 'builder') {
      rodarBuilder(creep);
    } else {
      rodarHarvester(creep);
    }
  }
};
