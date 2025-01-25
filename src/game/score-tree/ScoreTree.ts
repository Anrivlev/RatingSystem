import { Player } from "../player/Player";
import { RatingItem } from "../rating-system/RatingItem";
import { ScoreTreeNode } from "./ScoreTreeNode";
import { RatingCalculator } from "../rating-system/RatingCalculator";

export class ScoreTree {
    private root: ScoreTreeNode;

    constructor() {}

    public build(players: Player[], items: RatingItem[]): void {
        this.buildRoot(players, items);
    }

    public addPlayer(player: Player, items: RatingItem[]): void {
        this.root.playerIdToScore.set(player.id, 0);
        const appearedItems = new Set<RatingItem>();
        items.forEach((nodeItem) => {
            const childNode = this.root.children.get(nodeItem.id);
            if (!childNode)
                throw new Error(`Не найден узел для предмета  ${nodeItem.id}`);
            this.addPlayerScoreToNode(
                player,
                childNode,
                nodeItem,
                0,
                appearedItems,
                items,
            );
        });
    }

    public removePlayer(playerId: number): void {
        if (!this.root) return;
        this.removePlayerFromNode(playerId, this.root);
    }

    private addPlayerScoreToNode(
        player: Player,
        node: ScoreTreeNode,
        nodeItem: RatingItem,
        score: number,
        appearedItems: Set<RatingItem>,
        remainingItems: RatingItem[],
    ): void {
        const nodeScore =
            score +
            RatingCalculator.getScoreOfItem(
                appearedItems,
                nodeItem,
                player.ratingList,
            );

        node.playerIdToScore.set(player.id, nodeScore);

        const nodeAppearedItems = new Set(appearedItems);
        nodeAppearedItems.add(nodeItem);

        remainingItems.forEach((remainingItem) => {
            const childNode = node.children.get(remainingItem.id);
            if (!childNode)
                throw new Error(
                    `Не найден узел для предмета  ${remainingItem.id}`,
                );

            const nextNodeRemainingItems = remainingItems.filter(
                (item) => item != remainingItem,
            );

            this.addPlayerScoreToNode(
                player,
                childNode,
                remainingItem,
                nodeScore,
                nodeAppearedItems,
                nextNodeRemainingItems,
            );
        });
    }

    private removePlayerFromNode(playerId: number, node: ScoreTreeNode): void {
        node.playerIdToScore.delete(playerId);
        node.children.forEach((childNode) =>
            this.removePlayerFromNode(playerId, childNode),
        );
    }

    private buildRoot(players: Player[], items: RatingItem[]): void {
        this.root = {
            playerIdToScore: new Map(),
            children: new Map(),
        };
        players.forEach((player) =>
            this.root.playerIdToScore.set(player.id, 0),
        );
        const scores = new Array(players.length).fill(0);
        this.buildChildren(this.root, players, scores, new Set(), items);
    }

    private buildChildren(
        parent: ScoreTreeNode,
        players: Player[],
        scores: number[],
        appearedItems: Set<RatingItem>,
        remainingItems: RatingItem[],
    ): void {
        if (!parent.children) parent.children = new Map();
        remainingItems.forEach((remainigItem) => {
            const nextNodeAppearedItems = new Set(appearedItems);
            nextNodeAppearedItems.add(remainigItem);
            const nextNodeRemainingItems = remainingItems.filter(
                (item) => item != remainigItem,
            );

            const nextNode = this.buildNextNode(
                players,
                scores,
                nextNodeAppearedItems,
                remainigItem,
                nextNodeRemainingItems,
                parent,
            );
            parent.children.set(remainigItem.id, nextNode);
        });
    }

    private buildNextNode(
        players: Player[],
        scores: number[],
        appearedItems: Set<RatingItem>,
        nodeItem: RatingItem,
        remainingItems: RatingItem[],
        parent: ScoreTreeNode,
    ): ScoreTreeNode {
        const nodeScores = scores.map((score, index) => {
            const player = players[index];
            return (
                score +
                RatingCalculator.getScoreOfItem(
                    appearedItems,
                    nodeItem,
                    player.ratingList,
                )
            );
        });
        const playerIdToScore = new Map<number, number>();
        players.forEach((player, index) => {
            playerIdToScore.set(player.id, nodeScores[index]);
        });
        const node = {
            parent,
            playerIdToScore,
            children: new Map(),
        };
        const nodeAppearedItems = new Set(appearedItems);
        nodeAppearedItems.add(nodeItem);
        this.buildChildren(
            node,
            players,
            nodeScores,
            nodeAppearedItems,
            remainingItems,
        );
        return node;
    }
}
