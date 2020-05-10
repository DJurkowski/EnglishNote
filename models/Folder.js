const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    profile: {
        type: mongoose.FolderSchema.Types.ObjectId,
        ref: 'profile'
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