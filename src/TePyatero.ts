import { RatingItem } from "./game/rating-system/RatingItem";

export const TePyatero = {
    Gosha: { id: 0, name: "Гоша" },
    Timothy: { id: 1, name: "Тимофей" },
    Ilya: { id: 2, name: "Илья" },
    Anri: { id: 3, name: "Анри" },
    Oleg: { id: 4, name: "Олег" },
} satisfies { [key: string]: RatingItem };
