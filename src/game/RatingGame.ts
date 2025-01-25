import { GameStateManager } from './state/GameStateManager';
export class RatingGame {
    private gameStateManager: GameStateManager;

    constructor() {
        this.gameStateManager = new GameStateManager();
    }

    public init(): void {
        this.gameStateManager.init();
    }
}