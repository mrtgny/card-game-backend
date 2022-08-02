import { BOOLEAN, INTEGER, STRING, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config";
import { getSchemeName } from "../utils";

const Decks = sequelize.define(
    "decks",
    {
        deckId: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        type: {
            type: STRING
        },
        shuffled: {
            type: BOOLEAN
        },
        remaining: {
            type: INTEGER
        },
    },
    {
        schema: getSchemeName()
    }
);



export default Decks;
