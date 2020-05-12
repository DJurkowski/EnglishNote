const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    words: [
        {
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
    ]
});

module.exports = Folder = mongoose.model('folder', FolderSchema);