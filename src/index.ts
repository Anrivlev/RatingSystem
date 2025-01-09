import { RatingList } from "./rating-system/RatingList";
import { TePyatero } from "./TePyatero";
import { RatingCalculator } from "./rating-system/RatingCalculator";

const ratingLists: RatingList<TePyatero>[] = [
    {
        name: "Гоша",
        items: ["Тимофей", "Илья", "Анри", "Олег", "Гоша"],
    },
    {
        name: "Илья",
        items: ["Олег", "Илья", "Анри", "Тимофей", "Гоша"],
    },
    {
        name: "Олег",
        items: ["Тимофей", "Илья", "Гоша", "Олег", "Анри"],
    },
    {
        name: "Тимофей",
        items: ["Олег", "Анри", "Тимофей", "Илья", "Гоша"],
    },
    {
        name: "Анри",
        items: ["Гоша", "Олег", "Илья", "Тимофей", "Анри"],
    },
];
let finalString = "";
ratingLists.forEach((actualList) => {
    const startString = `Если ${actualList.name} угадал всех верно:`;
    finalString += startString;
    finalString += '\n';
    console.log(startString);
    const scores = RatingCalculator.getScores(ratingLists, actualList);
    const scoresSorted = Array.from(scores.entries()).sort(
        (a, b) => b[1] - a[1],
    );
   const  scoresSortedString = scoresSorted
        .map((scoreWithName) => `${scoreWithName[0]}: ${scoreWithName[1]}`)
        .join("\n");
    finalString += scoresSortedString;
    finalString += '\n';
    finalString += '\n';
    console.log(scoresSortedString);
});

console.log(finalString);