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
            word: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'word'
            }
        }
    ]
});

module.exports = Folder = mongoose.model('folder', FolderSchema);