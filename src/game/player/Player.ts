import { RatingItem } from "../rating-system/RatingItem";
import { RatingList } from "../rating-system/RatingList";

export interface Player {
    id: number;
    name: string;
    ratingList: RatingList<RatingItem>;
}
