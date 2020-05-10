const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    user: {
        type: mongoose.FolderSchema.Types.ObjectId,
        ref: 'user'
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