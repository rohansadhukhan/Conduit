import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'

import { Article } from './entities/Article';
import { User } from './entities/User';
import { Comment } from './entities/Comment';
import { Tag } from './entities/Tag';

import { userRoute } from './routes/user'
import { usersRoute } from './routes/users'
import { articlesRoute } from './routes/articles'
import { profileRouter } from './routes/profiles';
import { tagsRouter } from './routes/tags';

const app = express();
const port = 3232;
const corsOption = {
    origin: ['http://localhost:3000', 'http://localhost:3232', 'https://127.0.0.1'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/api/user', userRoute);
app.use('/api/users', usersRoute);
app.use('/api/articles', articlesRoute);
app.use('/api/profiles', profileRouter);
app.use('/api/tags', tagsRouter)

async function start() {

    await createConnection({
        type: 'postgres',
        username: 'conduit',
        password: 'conduit',
        database: 'conduit',
        entities: [Article, User, Comment, Tag],
        synchronize: true,
        // dropSchema: true, // TODO : not for production
        logging: true,
        logger: 'advanced-console',

    });

    app.listen(port, () => {
        console.log(`Server is listening at port number ${port}`);
    });
}
start();

// https://conduit.productionready.io/api/articles
// raddish for caching
// passport for production
// coding block site oneauth at github