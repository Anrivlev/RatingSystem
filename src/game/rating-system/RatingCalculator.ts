import { RatingList } from "./RatingList";

export class RatingCalculator {
    public static getScores<T>(
        ratingLists: RatingList<T>[],
        actualList: RatingList<T>,
    ): Map<RatingList<T>, number> {
        return new Map(
            ratingLists.map((ratingList) => [
                ratingList,
                this.getScore(ratingList, actualList),
            ]),
        );
    }

    public static getScore<T>(
        ratingList: RatingList<T>,
        actualList: RatingList<T>,
    ): number {
        let score = 0;
        const appearedItems = new Set<T>();
        actualList.items.forEach((actualItem) => {
            score += this.getScoreOfItem(appearedItems, actualItem, ratingList);
            appearedItems.add(actualItem);
        });
        return score;
    }

    public static getScoreOfItem<T>(
        appearedItems: Set<T>,
        item: T,
        ratingList: RatingList<T>,
    ): number {
        let score = 0;
        let hasFoundItem: boolean = false;
        ratingList.items.forEach((itemInRatingList) => {
            if (itemInRatingList === item) {
                hasFoundItem = true;
                return;
            }
            if (!hasFoundItem && appearedItems.has(itemInRatingList))
                score += 1;
            else if (hasFoundItem && !appearedItems.has(itemInRatingList))
                score += 1;
        });
        return score;
    }
}
