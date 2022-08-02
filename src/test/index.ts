import chai from 'chai';
import chaiHttp from 'chai-http';
import type { Server } from 'http';
import "../config";
import sequelize from '../config';
import createServer from '../server';

chai.should();

chai.use(chaiHttp);

const prepare = (done: Mocha.Done, setServer: (server: Server) => void) => {
    try {
        sequelize.drop()
            .then(() => {
                createServer()
                    .then((_server: Server) => {
                        setServer(_server)
                        done();
                    })
            })
    } catch (e) {
        done(e)
    }
}

let server: Server;
describe('FULL, NON-SHUFFLED', () => {
    before((done) => prepare(done, (_server: Server) => { server = _server }))

    let deckId: string;
    it('It should throw NotFound Error for opening deck', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should throw NotFound Error for drawing card', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should create non-shuffled full deck', (done) => {
        const body = {
            "shuffled": false,
            "type": "FULL"
        }
        chai.request(server)
            .post('/api/decks/create')
            .send(body)
            .end((err, res) => {
                deckId = res.body.deckId
                res.body.remaining.should.be.eql(52)
                res.body.shuffled.should.be.eql(false)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(201);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(52)
                res.body.shuffled.should.be.eql(false)
                res.body.cards.length.should.be.eql(52)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should throw error invalid deckId for opening deck', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should draw 12 cards', (done) => {
        const body = {
            deckId,
            count: 12
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.cards.length.should.be.eql(12)
                res.should.have.status(200);
                done(err);
            });
    });

    it('It should throw invalid deckId for draw card', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(40)
                res.body.shuffled.should.be.eql(false)
                res.body.cards.length.should.be.eql(40)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});

describe('FULL, SHUFFLED', () => {
    let deckId: string;

    it('It should throw NotFound Error for opening deck', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should throw NotFound Error for drawing card', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should create shuffled full deck', (done) => {
        const body = {
            "shuffled": true,
            "type": "FULL"
        }
        chai.request(server)
            .post('/api/decks/create')
            .send(body)
            .end((err, res) => {
                deckId = res.body.deckId
                res.body.remaining.should.be.eql(52)
                res.body.shuffled.should.be.eql(true)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(201);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(52)
                res.body.shuffled.should.be.eql(true)
                res.body.cards.length.should.be.eql(52)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should throw error invalid deckId for opening deck', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should draw 12 cards', (done) => {
        const body = {
            deckId,
            count: 12
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.cards.length.should.be.eql(12)
                res.should.have.status(200);
                done(err);
            });
    });

    it('It should throw invalid deckId for draw card', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(40)
                res.body.shuffled.should.be.eql(true)
                res.body.cards.length.should.be.eql(40)
                res.body.type.should.be.eql("FULL")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});

describe('SHORT, NON-SHUFFLED', () => {
    let deckId: string;

    it('It should throw NotFound Error for opening deck', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should throw NotFound Error for drawing card', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should create non-shuffled short deck', (done) => {
        const body = {
            "shuffled": false,
            "type": "SHORT"
        }
        chai.request(server)
            .post('/api/decks/create')
            .send(body)
            .end((err, res) => {
                deckId = res.body.deckId
                res.body.remaining.should.be.eql(32)
                res.body.shuffled.should.be.eql(false)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(201);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(32)
                res.body.shuffled.should.be.eql(false)
                res.body.cards.length.should.be.eql(32)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should throw error invalid deckId for opening deck', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should draw 12 cards', (done) => {
        const body = {
            deckId,
            count: 12
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.cards.length.should.be.eql(12)
                res.should.have.status(200);
                done(err);
            });
    });

    it('It should throw invalid deckId for draw card', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(20)
                res.body.shuffled.should.be.eql(false)
                res.body.cards.length.should.be.eql(20)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});

describe('SHORT, SHUFFLED', () => {
    let deckId: string;

    it('It should throw NotFound Error for opening deck', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should throw NotFound Error for drawing card', (done) => {
        const body = {
            deckId: "7ef9aa32-1cc6-43f0-92c3-9026d12f798b"
        }
        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                done(err);
            });
    });

    it('It should create shuffled short deck', (done) => {
        const body = {
            "shuffled": true,
            "type": "SHORT"
        }
        chai.request(server)
            .post('/api/decks/create')
            .send(body)
            .end((err, res) => {
                deckId = res.body.deckId
                res.body.remaining.should.be.eql(32)
                res.body.shuffled.should.be.eql(true)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(201);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(32)
                res.body.shuffled.should.be.eql(true)
                res.body.cards.length.should.be.eql(32)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should throw error invalid deckId for opening deck', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done(err);
            });
    });

    it('It should draw 12 cards', (done) => {
        const body = {
            deckId,
            count: 12
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.cards.length.should.be.eql(12)
                res.should.have.status(200);
                done(err);
            });
    });

    it('It should throw invalid deckId for draw card', (done) => {
        const body = {
            deckId: "123123-123213-31212-1234"
        };

        chai.request(server)
            .post('/api/decks/draw')
            .send(body)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.should.have.status(400);
                done(err);
            });
    });


    it('It should open the deck', (done) => {
        const body = {
            deckId
        };

        chai.request(server)
            .post('/api/decks/open')
            .send(body)
            .end((err, res) => {
                res.body.remaining.should.be.eql(20)
                res.body.shuffled.should.be.eql(true)
                res.body.cards.length.should.be.eql(20)
                res.body.type.should.be.eql("SHORT")
                res.should.have.status(200);
                res.body.should.be.a('object');
                done(err);
            });
    });
});