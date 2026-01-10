declare namespace Internal {
    interface IRecipeHandlerTrait<K> extends Internal.IRecipeHandler<K> {
        abstract getHandlerIO(): Internal.IO;
        abstract addChangedListener(listener: Runnable): Internal.ISubscription;
    }

    abstract class NotifiableRecipeHandlerTrait<K> extends Internal.MachineTrait implements Internal.IRecipeHandlerTrait<K> {
        constructor(arg0: Internal.MetaMachine_)
        getClass(): typeof any;
        getFieldHolder(): Internal.ManagedFieldHolder;
        addChangedListener(listener: Runnable): Internal.ISubscription;
        notifyListeners(): void;

    }
}
