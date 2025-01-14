require('dotenv').config();  
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const fs = require('fs'); 
const app = express();
const userRoutes = require('./routes/userRoutes'); 
const auth = require('./middlewares/auth'); 
const cors = require('cors');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use('/users', userRoutes);

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

function isSchulordnungQuestion(question) {
    if (!question || typeof question !== 'string') {
        console.error("Ungültige Frage:", question);
        return null;
    }

    if (!data.schulordnung || !data.schulordnung.allgemeine_regeln) {
        console.error("Schulordnung nicht verfügbar oder fehlerhaft.");
        return null;
    }

    const lowerCaseQuestion = question.toLowerCase();

    for (const rule of data.schulordnung.allgemeine_regeln) {
        if (!rule.rule || !rule.keyword || !rule.paragraph) {
            console.error("Fehlerhafte Regel im JSON:", rule);
            continue;
        }

        if (lowerCaseQuestion.includes(rule.keyword.toLowerCase())) {
            return {
                paragraph: rule.paragraph,
                rule: rule.rule
            };
        }
    }

    return null; 
}

function isEducationalOfferQuestion(question) {
    if (!question || typeof question !== 'string') {
        console.error("Ungültige Frage:", question);
        return null;
    }

    if (!data.bildungsangebote) {
        console.error("Bildungsangebote nicht verfügbar oder fehlerhaft.");
        return null;
    }

    const lowerCaseQuestion = question.toLowerCase();

    for (const offer of data.bildungsangebote) {
        if (!offer.category || !Array.isArray(offer.occupations)) {
            console.error("Fehlerhaftes Bildungsangebot:", offer);
            continue;
        }

        for (const occupation of offer.occupations) {
            if (!occupation.name || !occupation.link) {
                console.error("Fehlerhafte Berufsdaten:", occupation);
                continue;
            }

            if (
                lowerCaseQuestion.includes(occupation.name.toLowerCase()) ||
                lowerCaseQuestion.includes(offer.category.toLowerCase())
            ) {
                return {
                    category: offer.category,
                    occupation: occupation.name,
                    link: occupation.link
                };
            }
        }
    }

    return null; 
}

app.post('/proxy/messages', async (req, res) => {
    try {
        console.log('Empfangene Anfrage:', req.body);

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const prompt = `Bitte antworte nur auf Deutsch und in kurzen Sätzen, das hier ist deine Frage: ${message}`;

        const data = { 
            prompt: prompt,  
            input: message   
        };

        const url = process.env.API_URL
        const headers = {
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'origin': process.env.ORIGIN,
            'referer': process.env.REFERER,
            'user-agent':  process.env.USER_AGENT
        };

        const response = await axios.post(url, data, { headers });

        res.status(response.status).json(response.data);

    } catch (error) {
        console.error('Fehler bei der API-Anfrage:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'API-Fehler', details: error.response ? error.response.data : error.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});