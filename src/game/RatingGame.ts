import { GameInterface } from "./interface/GameInterface";
import { GameStateManager } from "./state/GameStateManager";
export class RatingGame {
    private stateManager: GameStateManager;

    private interface: GameInterface;

    constructor() {
        this.stateManager = new GameStateManager();
        this.interface = new GameInterface(this);
    }

    public init(containerDiv: HTMLDivElement): void {
        this.stateManager.init();
        this.interface.init(containerDiv);
    }
}
