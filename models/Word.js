const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'folder'
    },
    polishword: {
        type: String
    },
    englishword: {
        type: String
    },
    synonyms: {
        type: [String]
    }
});

module.exports = Word = mongoose.model('word', WordSchema);