import express from 'express';
import cors from 'cors';
import notFoundMiddleware from './src/middlewares/notfound.middleware.js';
import errorMiddleware from './src/middlewares/error.middleware.js';
import authRouter from './src/routes/auth.routes.js'
import authUser from './src/routes/user.routes.js'

const PORT = 8000;
const app = express();

app.use(express.json());
// app.use(cors());

app.use('/auth', authRouter);
app.use('/users', authUser);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
})