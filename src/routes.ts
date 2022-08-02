import type { Express } from "express";
import * as cards from "./methods/cards";
import * as decks from "./methods/decks";
import Cards from "./tables/cards";
import Decks from "./tables/decks";

const initRelations = () => {

    Decks.hasMany(Cards, {
        as: "cards",
        foreignKey: "deckId"
    });

    Cards.belongsTo(Decks, {
        as: "deck",
        foreignKey: "deckId"
    });
}

const initTables = async () => {
    await cards.sync();
    await decks.sync();
    initRelations();
}

const deckRoutes = (app: Express) => {
    app.post("/api/decks/create", decks.create);
    app.post("/api/decks/open", decks.open);
    app.post("/api/decks/draw", decks.draw);
}

const init = async (app: Express) => {
    await initTables();
    deckRoutes(app);
};

export {
    init
};
