import app from "./app";

import './config/env.config';

import {env} from './config/env.config';

const PORT=env.port;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


