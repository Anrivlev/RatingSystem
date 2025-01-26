import { TePyatero } from "./TePyatero";
import { RatingCalculator } from "./game/rating-system/RatingCalculator";
import { Player } from "./game/player/Player";
import { ScoreTree } from './game/score-tree/ScoreTree';

const items = [
    TePyatero.Anri,
    TePyatero.Gosha,
    TePyatero.Ilya,
    TePyatero.Oleg,
    TePyatero.Timothy,
];

const players: Player[] = [
    {
        name: "Гоша",
        id: 0,
        ratingList: {
            items: [
                TePyatero.Timothy,
                TePyatero.Ilya,
                TePyatero.Anri,
                TePyatero.Oleg,
                TePyatero.Gosha,
            ],
        },
    },
    {
        name: "Илья",
        id: 1,
        ratingList: {
            items: [
                TePyatero.Oleg,
                TePyatero.Ilya,
                TePyatero.Anri,
                TePyatero.Timothy,
                TePyatero.Gosha,
            ],
        },
    },
    {
        name: "Олег",
        id: 2,
        ratingList: {
            items: [
                TePyatero.Timothy,
                TePyatero.Ilya,
                TePyatero.Gosha,
                TePyatero.Oleg,
                TePyatero.Anri,
            ],
        },
    },
    {
        name: "Тимофей",
        id: 3,
        ratingList: {
            items: [
                TePyatero.Oleg,
                TePyatero.Anri,
                TePyatero.Timothy,
                TePyatero.Ilya,
                TePyatero.Gosha,
            ],
        },
    },
    {
        name: "Анри",
        id: 4,
        ratingList: {
            items: [
                TePyatero.Gosha,
                TePyatero.Oleg,
                TePyatero.Ilya,
                TePyatero.Timothy,
                TePyatero.Anri,
            ],
        },
    },
];
let finalString = "";
players.forEach((player) => {
    const startString = `Если ${player.name} угадал всех верно:`;
    finalString += startString;
    finalString += "\n";
    console.log(startString);
    const scores = RatingCalculator.getScores(
        players.map((player) => player.ratingList),
        player.ratingList,
    );
    const scoresSorted = Array.from(scores.entries()).sort(
        (a, b) => b[1] - a[1],
    );
    const scoresSortedString = scoresSorted
        .map((scoreWithName) => `${scoreWithName[0]}: ${scoreWithName[1]}`)
        .join("\n");
    finalString += scoresSortedString;
    finalString += "\n";
    finalString += "\n";
    console.log(scoresSortedString);
});

console.log(finalString);

const scoreTree = new ScoreTree();
scoreTree.build(items);
scoreTree.addPlayers(players);
console.log(scoreTree);