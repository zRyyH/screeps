export function rodarHarvester(creep: Creep): void {
  if (creep.store.getFreeCapacity() > 0) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (!source) return;

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  } else {
    const alvo = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s): s is StructureSpawn | StructureExtension =>
        (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    });

    if (!alvo) return;

    if (creep.transfer(alvo, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(alvo, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  }
}
