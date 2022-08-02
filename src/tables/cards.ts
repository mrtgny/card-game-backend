import { INTEGER, STRING, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config";
import { getSchemeName } from "../utils";

const Cards = sequelize.define(
    "cards",
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        deckId: {
            type: UUID,
        },
        value: {
            type: STRING
        },
        suit: {
            type: STRING
        },
        code: {
            type: STRING
        },
        order: {
            type: INTEGER
        },
    },
    {
        schema: getSchemeName()
    }
);

export default Cards;
