import { RatingGame } from "../RatingGame";
import { MainMenu } from "./menus/main-menu/MainMenu";
import { PlayerCreationMenu } from "./menus/player-creation-menu/PlayerCreationMenu";
import { RatingListCreationMenu } from "./menus/rating-list-creation-menu/RatingListMenu";

export class GameInterface {
    private game: RatingGame;

    private containerDiv: HTMLDivElement;

    private mainMenu: MainMenu;

    private ratingListCreationMenu: RatingListCreationMenu;

    private playerCreationMenu: PlayerCreationMenu;

    constructor(game: RatingGame) {
        this.game = game;

        this.mainMenu = new MainMenu();
        this.ratingListCreationMenu = new RatingListCreationMenu();
        this.playerCreationMenu = new PlayerCreationMenu();
    }

    public init(containerDiv: HTMLDivElement): void {
        this.containerDiv = containerDiv;
    }
}
