import { SPAWN_NAME } from './config';
import { limparCreepsMortos } from './memory';
import { gerenciarSpawn } from './spawn';
import { rodarHarvester } from './harvester';

export const loop = function (): void {
  limparCreepsMortos();

  const spawn = Game.spawns[SPAWN_NAME];
  if (!spawn) return;

  gerenciarSpawn(spawn);

  for (const nome in Game.creeps) {
    rodarHarvester(Game.creeps[nome]);
  }
};
