import { RatingItem } from "../rating-system/RatingItem";

export interface ScoreTreeNode {
    parent?: ScoreTreeNode;
    playerIdToScore: Map<number, number>;
    children: Map<number, ScoreTreeNode>;
}
