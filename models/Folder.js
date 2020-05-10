const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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