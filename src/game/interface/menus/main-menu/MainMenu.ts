export class MainMenu {
    private containerDiv: HTMLDivElement;

    private mainMenuDiv: HTMLDivElement;

    constructor() {
        this.mainMenuDiv = document.createElement("div");
    }

    public init(containerDiv: HTMLDivElement): void {
        this.containerDiv = containerDiv;
    }
}
