import config from "./config";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { checkDatabaseConnection} from './db';

// Check if db is connected or not
checkDatabaseConnection();

const app = express();

// Middleware setup
//connect frontend with backend
app.use(cors());

//handle form data
app.use(bodyParser.urlencoded({extended:false}));

//change to body to json
app.use(bodyParser.json());

//All the routing done here
app.use(routes);

// Start the server and listen on the specified port
app.listen(config.serverPort, () => {
  console.log(`Server is running on port ${config.serverPort}`);
});