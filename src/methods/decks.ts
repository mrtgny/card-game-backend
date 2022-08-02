import type { Request, Response } from "express";
import Cards from "../tables/cards";
import Decks from "../tables/decks";
import { CARD, generateDeck, shuffle, validateUUIDV4 } from "../utils";

const create = async (req: Request, res: Response) => {
  try {
    const { shuffled, type } = req.body;
    const cardsOfTheDeck = generateDeck(type)
    const remaining = cardsOfTheDeck.length;
    const newDeckObj = await Decks.create({
      shuffled,
      type,
      remaining,
    });

    const newDeck = newDeckObj.get()

    cardsOfTheDeck.forEach(card => {
      card.deckId = newDeck.deckId
    });

    if (shuffled) shuffle(cardsOfTheDeck);
    await Cards.bulkCreate(
      cardsOfTheDeck
    );

    delete newDeck["createdAt"];
    delete newDeck["updatedAt"];
    return res.status(201).send(newDeck);
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

const open = async (req: Request, res: Response) => {
  const { deckId } = req.body;

  try {
    if (!validateUUIDV4(deckId)) throw Error("Invalid deckId");
    const openedDeckObj = await Decks.findByPk(deckId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
        model: Cards,
        as: "cards",
        attributes: ["value", "suit", "code"],
        order: [
          ["order", "ASC"]
        ]
      }
    });
    if (openedDeckObj === null)
      return res.status(404).send({
        message: "Not found"
      });

    const openedDeck = openedDeckObj.get();
    openedDeck.remaining = openedDeck.cards.length;
    return res.status(200).send(openedDeck);
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

const draw = async (req: Request, res: Response) => {
  const { deckId, count } = req.body;

  try {
    if (!validateUUIDV4(deckId)) {
      throw Error("Invalid deckId");
    }

    const openedDeckObj = await Decks.findByPk(deckId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: {
        model: Cards,
        as: "cards",
        attributes: ["id", "value", "suit", "code"],
        order: [
          ["order", "ASC"]
        ]
      }
    });
    if (openedDeckObj === null)
      return res.status(404).send({
        message: "Not found"
      });

    const openedDeck = openedDeckObj.get();

    const drawnCards = [];
    openedDeck.cards.forEach((card: CARD, index: number) => {
      if (index < count) {
        drawnCards.push(card)
      } else {
        return;
      }
    });

    await Cards.destroy({
      where: {
        id: drawnCards.map(i => i.id)
      }
    });

    drawnCards.forEach(cardObj => {
      const card = cardObj.get()
      delete card["id"]
    });

    return res.status(200).send({
      cards: drawnCards
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message
    });
  }
};

const sync = () => {
  return Decks.sync();
}

export {
  create,
  open,
  draw,
  sync
};
