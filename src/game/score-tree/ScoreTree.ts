import { Player } from "../player/Player";
import { RatingItem } from "../rating-system/RatingItem";
import { ScoreTreeNode } from "./ScoreTreeNode";
import { RatingCalculator } from "../rating-system/RatingCalculator";

export class ScoreTree {
    private root: ScoreTreeNode;

    private items: RatingItem[];

    constructor() {}

    public build(items: RatingItem[]): void {
        this.items = items;
        this.buildRoot(items);
    }

    public addPlayers(players: Player[]): void {
        players.forEach((player) => {
            this.root.playerIdToScore.set(player.id, 0);
        });
        const appearedItems = new Set<RatingItem>();
        const scores = new Array(players.length).fill(0);
        this.items.forEach((nodeItem) => {
            const childNode = this.root.children.get(nodeItem.id);
            if (!childNode)
                throw new Error(`Не найден узел для предмета  ${nodeItem.id}`);

            const remainingItems = this.items.filter(
                (item) => item !== nodeItem,
            );

            this.addPlayersToNode(
                players,
                childNode,
                nodeItem,
                scores,
                appearedItems,
                remainingItems,
            );
        });
    }

    private addPlayersToNode(
        players: Player[],
        node: ScoreTreeNode,
        nodeItem: RatingItem,
        scores: number[],
        appearedItems: Set<RatingItem>,
        remainingItems: RatingItem[],
    ): void {
        const nodeScores = players.map(
            (player, index) =>
                scores[index] +
                RatingCalculator.getScoreOfItem(
                    appearedItems,
                    nodeItem,
                    player.ratingList,
                ),
        );

        players.forEach((player, index) => {
            node.playerIdToScore.set(player.id, nodeScores[index]);
        });

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

            this.addPlayersToNode(
                players,
                childNode,
                remainingItem,
                nodeScores,
                nodeAppearedItems,
                nextNodeRemainingItems,
            );
        });
    }

    public addPlayer(player: Player): void {
        this.root.playerIdToScore.set(player.id, 0);
        const appearedItems = new Set<RatingItem>();
        this.items.forEach((nodeItem) => {
            const childNode = this.root.children.get(nodeItem.id);
            if (!childNode)
                throw new Error(`Не найден узел для предмета  ${nodeItem.id}`);

            const remainingItems = this.items.filter(
                (item) => item !== nodeItem,
            );

            this.addPlayerToNode(
                player,
                childNode,
                nodeItem,
                0,
                appearedItems,
                remainingItems,
            );
        });
    }

    public removePlayer(playerId: number): void {
        if (!this.root) return;
        this.removePlayerFromNode(playerId, this.root);
    }

    private addPlayerToNode(
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

            this.addPlayerToNode(
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

    private buildRoot(items: RatingItem[]): void {
        this.root = {
            playerIdToScore: new Map(),
            children: new Map(),
        };
        this.buildChildren(this.root, items);
    }

    private buildChildren(
        parent: ScoreTreeNode,
        remainingItems: RatingItem[],
    ): void {
        if (!parent.children) parent.children = new Map();
        remainingItems.forEach((remainigItem) => {
            const nextNodeRemainingItems = remainingItems.filter(
                (item) => item != remainigItem,
            );

            const nextNode = this.buildNextNode(nextNodeRemainingItems, parent);
            parent.children.set(remainigItem.id, nextNode);
        });
    }

    private buildNextNode(
        remainingItems: RatingItem[],
        parent: ScoreTreeNode,
    ): ScoreTreeNode {
        const playerIdToScore = new Map<number, number>();
        const node = {
            parent,
            playerIdToScore,
            children: new Map(),
        };
        this.buildChildren(node, remainingItems);
        return node;
    }
}
