interface MasterMultiMachine extends Internal.WorkableElectricMultiblockMachine {}

type SlaveMultiMachine = Internal.WorkableElectricMultiblockMachine & {
    getParent(): MasterMultiMachine | null;
    setParent(master: MasterMultiMachine): void;
    removeParent(): void;
    getLinkState(): "not_detected" | "active" | "not_active";
    serverTick(): void;
};

type WirelessEnergyAcceptor = Internal.NotifiableRecipeHandlerTrait<EnergyStack> & Internal.IEnergyContainer & {};
