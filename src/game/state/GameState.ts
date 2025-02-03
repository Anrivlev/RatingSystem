import { Player } from "../player/Player";
import { RatingItem } from "../rating-system/RatingItem";

export interface GameState {
    players: Player[];
    playerIdCount: number;
    items: RatingItem[];
    itemIdCount: number;
}
