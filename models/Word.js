const mongoose = require('mongoose');

const WordSchema = {
    polishword: {
        type: String
    },
    englishword: {
        type: String
    },
    synonyms: {
        type: [String]
    }
}

module.exports = Word = mongoose.model('word', WordSchema);