// Core Node.js modules
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Third-party modules
import express from 'express';

// Local modules
import sessionConfig from './utils/sessionConfig.js';

// Load configuration
const require = createRequire(import.meta.url);
const config = require("./config.json")

// Set up __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Router modules
import loginRouter from './routes/login.js';
import sqlRouter from './routes/sql.js';

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Use session configuration
app.use(sessionConfig);

app.use('/login', loginRouter);
app.use('/sql', sqlRouter);

const requireAuth = (req, res, next) => {
    if (req.session.auth) {
        next()
    } else {
        res.redirect(`http://${req.hostname}:${config.port}/login`)
    }
}

app.get('/', requireAuth, (req, res) => {
    res.render('home.ejs', {error: "", dynamic: req.hostname})
});

// This is hardcoded data but this is where you would serve up info pulled from SNOW
app.get('/data', async (req, res) => {
    res.json([
        {
            "Number": "INC01795709",
            "Assignment Group": "Post Technology - News",
            "Assigned to": "Kaylen Scott",
            "Short Description": "No audio is being outputted on AT-INS-ED021."
        },
        {
            "Number": "INC01796004",
            "Assignment Group": "BCC",
            "Assigned to": "Jacques Thomas",
            "Short Description": "Okta password reset"
        },
        {
            "Number": "INC01796315",
            "Assignment Group": "BCC",
            "Assigned to": "Patrick Crudup",
            "Short Description": "User is locked out of NT account."
        },
        {
            "Number": "INC01796314",
            "Assignment Group": "Post Technology - News",
            "Assigned to": "Kaylen Scott",
            "Short Description": "Edit 21 - No audio from Genelec speakers, reoccurring issue in this bay"
        }
    ])
});

app.listen(config.port, () => {
    console.log(`Matt's Dashboard is listening at http://localhost:${config.port}`)
})

export default app

