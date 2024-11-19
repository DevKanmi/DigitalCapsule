import express from 'express'

export const app = express()

import { user } from './routes/user.route';
import { capsule } from './routes/capsule.route';
import { sendCapsules } from './utils/cronJob';

app.use(express.json())

app.use('/api/user', user)
app.use('/api/capsule/', capsule)

//Initialize Cron Job here
sendCapsules



app.use("**", (req, res) => {
	res.status(404).send({ message: "This route does not exist" });
});

