import { Player } from "../player/Player";
import { GameState } from "./GameState";

export class GameStateManager {
    private gameState: GameState;

    constructor() {}

    public init(gameState: GameState = GameStateManager.getNewState()): void {
        this.gameState = gameState;
    }

    public static getNewState(): GameState {
        return {
            players: [],
            playerIdCount: 0,
            items: [],
            itemIdCount: 0,
        };
    }

    public addPlayer(name: string): void {
        const id = this.gameState.playerIdCount;
        this.gameState.playerIdCount += 1;

        this.gameState.players.push({
            id,
            name,
            ratingList: {
                items: [],
            },
        });
    }

    public addRatingItem(name: string): void {
        const id = this.gameState.itemIdCount;
        this.gameState.itemIdCount += 1;

        this.gameState.items.push({
            id,
            name,
        });
    }
}
