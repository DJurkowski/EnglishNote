const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../models/Profile');
const Folder = require('../../models/Folder');
const Word = require('../../models/Word');

// @route   POST api/folder
// @desc    Create folder with words
// @access  Private
router.post('/', [
    auth,
    [
        check('name', 'Name is required').not().isEmpty()
    ]
], async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const name = req.body.name;

        try {
            let isFolder = await Folder.findOne({ name });
            if(isFolder) return res.status(400).json({ errors: [{msg: 'Folder with this name already exists'}]});
            
            const folderFileds = {};
            let profile = await Profile.findOne({ user: req.user.id });

            if(!profile) return res.status(401).json({ errors: [{msg: 'Profile not found. Log in or created new account'}]});

            folderFileds.profile = profile.id;
            folderFileds.name = req.body.name;

            let folder = new Folder(folderFileds);
            
            const words = req.body.words;
            folderFileds.words = [];
    
            if(words) {
                for( x of words) {
                    const wordFileds = {};
                    let {polishword, englishword, synonyms} = x.word;
                    if(synonyms) synonyms = synonyms.split('/').map(word => word.trim());
                    else synonyms = "";

                    wordFileds.folder = folder.id;
                    wordFileds.polishword = polishword;
                    wordFileds.englishword = englishword;
                    wordFileds.synonyms = synonyms;
    
                    let word = new Word(wordFileds);

                    await word.save();

                    folderFileds.words.push(word);
                }
            }
            folder.words = folderFileds.words;
            await folder.save();

            profile.folders.push(folder);
            await profile.save();

            return res.json(folder);
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;