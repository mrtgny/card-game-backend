const validateUUIDV4 = (uuid: string) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return regex.test(uuid)
}


const isTest = () => process.env.NODE_ENV === "test";

const getSchemeName = () => {
    return "cardgame"
}

enum E_DECK_TYPE {
    FULL = "FULL",
    SHORT = "SHORT"
}

const CARD_SUITS = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];
const CARD_VALUES = ["ACE", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING"];

declare type SUIT_TYPE = "SPADES" | "DIAMONDS" | "CLUBS" | "HEARTS";
declare type CARD_TYPE = "ACE" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "JACK" | "QUEEN" | "KING";

interface CARD {
    suit: SUIT_TYPE;
    value: CARD_TYPE,
    code: string;
    order: number
}

const isStringNumber = (number: string) => {
    return !isNaN(parseInt(number));
}

const getFirstLetter = (word: string) => {
    return word[0];
}

const getCardCode = (suit: string, value: string) => {
    const suitCode = getFirstLetter(suit);
    const valueCode = isStringNumber(value) ? value : getFirstLetter(value);
    return `${valueCode}${suitCode}`;
}

const generateDeck = (type?: E_DECK_TYPE) => {
    const isEmptyDeckType = type === undefined || type === null;
    if (isEmptyDeckType) throw Error("Unkown deck type");
    const isValidDeckType = type === E_DECK_TYPE.FULL || type === E_DECK_TYPE.SHORT;

    if (isValidDeckType) {
        const isShortType = type === E_DECK_TYPE.SHORT
        const deck = [];

        CARD_SUITS.forEach((suit, suitIndex) => {
            const orderOffset = suitIndex * CARD_VALUES.length;
            CARD_VALUES.forEach((value, valueIndex) => {
                const minShortDeckIndex = 1;
                const maxShortDeckIndex = 5;
                const shouldAdded = !(isShortType && valueIndex >= minShortDeckIndex && valueIndex <= maxShortDeckIndex);
                if (shouldAdded) {
                    const code = getCardCode(suit, value);
                    const card = {
                        suit,
                        value,
                        code,
                        order: orderOffset + valueIndex
                    }
                    deck.push(card);
                }
            });
        });

        return deck;
    }
    else throw Error("Unkown deck type");
}

const shuffle = (cards: CARD[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;

        cards[j].order = j;
        cards[i].order = i;
    }
}

export {
    isTest,
    getSchemeName,
    generateDeck,
    shuffle,
    validateUUIDV4,
    CARD_SUITS,
    CARD_VALUES
};
export type {
    E_DECK_TYPE,
    SUIT_TYPE,
    CARD_TYPE,
    CARD
};

