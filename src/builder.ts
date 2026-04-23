import { log } from './logger';

export function rodarBuilder(creep: Creep): void {
  if (!Memory.creeps[creep.name]) Memory.creeps[creep.name] = { role: 'builder' };
  const mem = Memory.creeps[creep.name];

  if (mem.construindo && creep.store[RESOURCE_ENERGY] === 0) {
    mem.construindo = false;
  }
  if (!mem.construindo && creep.store.getFreeCapacity() === 0) {
    mem.construindo = true;
  }

  if (mem.construindo) {
    const site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    if (site) {
      if (creep.build(site) === ERR_NOT_IN_RANGE) {
        log(creep, `indo construir ${site.structureType} em (${site.pos.x},${site.pos.y})`);
        creep.moveTo(site, { visualizePathStyle: { stroke: '#00aaff' } });
      } else {
        log(creep, `construindo ${site.structureType}`);
      }
      return;
    }

    const danificada = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax * 0.75 && s.structureType !== STRUCTURE_WALL,
    });
    if (danificada) {
      if (creep.repair(danificada) === ERR_NOT_IN_RANGE) {
        log(creep, `indo reparar ${danificada.structureType}`);
        creep.moveTo(danificada, { visualizePathStyle: { stroke: '#ff8800' } });
      } else {
        log(creep, `reparando ${danificada.structureType}`);
      }
      return;
    }

    const alvo = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s): s is StructureSpawn | StructureExtension =>
        (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    });
    if (alvo) {
      if (creep.transfer(alvo, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        log(creep, `indo entregar energia (sem obra)`);
        creep.moveTo(alvo, { visualizePathStyle: { stroke: '#ffffff' } });
      } else {
        log(creep, `entregando energia (sem obra)`);
      }
    } else {
      log(creep, 'sem obra e sem alvo para energia');
    }
  } else {
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
  }
}
