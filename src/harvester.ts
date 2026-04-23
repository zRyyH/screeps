import { log } from './logger';

export function rodarHarvester(creep: Creep): void {
  if (creep.store.getFreeCapacity() > 0) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (!source) {
      log(creep, 'sem fonte ativa');
      return;
    }

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      log(creep, `indo colher energia em (${source.pos.x},${source.pos.y})`);
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      log(creep, 'colhendo energia');
    }
  } else {
    const alvo = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s): s is StructureSpawn | StructureExtension =>
        (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    });

    if (alvo) {
      if (creep.transfer(alvo, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        log(creep, `indo entregar energia em ${alvo.structureType}`);
        creep.moveTo(alvo, { visualizePathStyle: { stroke: '#ffffff' } });
      } else {
        log(creep, `entregando energia em ${alvo.structureType}`);
      }
      return;
    }

    const controller = creep.room.controller;
    if (controller) {
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        log(creep, 'indo upgradar controller');
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff88' } });
      } else {
        log(creep, 'upgradando controller');
      }
    } else {
      log(creep, 'sem alvo disponivel');
    }
  }
}
