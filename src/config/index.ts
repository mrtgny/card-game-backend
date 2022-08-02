import { Sequelize } from "sequelize";
import { isTest } from "../utils";

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_DATABASE = isTest() ? "katana-test" : "katana";

const sequelize = new Sequelize(POSTGRES_DATABASE, 'postgres', POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: !isTest()
});

sequelize
    .authenticate({})
    .then(() => {
        if (!isTest())
            console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


export default sequelize;;
