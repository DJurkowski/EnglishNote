const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const Folder = require('../../models/Folder');

function handleWord({polishword, englishword, synonyms}) {

    if(synonyms) synonyms = synonyms.split(',').map(word => word.trim());
    else synonyms = "";

    return {polishword, englishword, synonyms};
}

// @route   GET api/folder
// @desc    Get all folders
// @access  Public
router.get('/', async (req, res) => {
    try {
        const folders = await Folder.find().sort({ date: -1 });
        res.json(folders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/folder/my
// @desc    Get my folders
// @access  Private
router.get('/my', auth, async (req, res) => {
    try {
        const profile = await  Profile.findOne({ user: req.user.id });
        if(!profile) {
            return res.status(404).json({ errors: [{msg: 'Profile not found. Please create profile'}]});
        }
        if(profile.folders){
            Promise.all( profile.folders.map( async item => await Folder.findById(item._id)))
            .then((values) => {
                res.json(values);
            });
        }else {
            return res.status(404).json({ errors: [{msg: 'Folders not found. Please create folder'}]});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/folder/:folder_id
// @desc    Get folder by Id
// @access  Public
router.get('/:folder_id', async (req,res) => {

    try {
        
        let folder = await Folder.findById({ _id: req.params.folder_id });
    
        if(!folder) return res.status(404).json({ errors: [{msg: 'Folder doesn\'t exist'}]});

        res.json(folder);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

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

            if(!profile) return res.status(401).json({ errors: [{msg: 'Profile not found. Log in or created profile'}]});

            folderFileds.profile = profile.id;
            folderFileds.name = req.body.name;

            let folder = new Folder(folderFileds);

            const words = req.body.words;
            folderFileds.words = [];
    
            if(words) {
                for( x of words) {

                    folderFileds.words.push(handleWord(x));
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

// @route   DELETE api/folder/:id
// @desc    Delete folder
// @access  Private
router.delete('/:folder_id', auth, async (req, res) =>{

    try{
        const profile = await Profile.findOne({ user: req.user.id });
        
        // Get remove index
        const removeIndex = profile.folders
        .map(item => item.id)
        .indexOf(req.params.folder_id);

       
        if(removeIndex === -1){
            return res.status(404).json({ errors: [{msg: 'Do not have authorization to make this action'}]});
        }

        profile.folders.splice(removeIndex, 1);

        await profile.save();

        await Folder.findByIdAndRemove({_id: req.params.folder_id});

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/folder/:folder_id/word
// @desc    Create and add new word to folder
// @access  Private
router.put('/:folder_id/word', auth, async (req, res) => {
    try {
        
        const isWord = req.body.word;

        if(isWord) {

            const folder = await Folder.findById({ _id: req.params.folder_id });

            folder.words.push(handleWord(isWord));

            await folder.save();

            res.json(folder);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/folder/:folder_id/words
// @desc    Add new words to folder
// @access  Private
router.put('/:folder_id/words', auth, async (req, res) => {
    try {
        
        const isWords = req.body.words;

        const folder = await Folder.findById({ _id: req.params.folder_id });

        if(isWords && isWords.length > 0 ) {
    
            isWords.forEach(word => {
                
                folder.words.push(handleWord(word));
            });

            await folder.save();

            res.json(folder);
        }

        res.json(folder);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/folder/:folder_id
// @desc    Update folder
// @access  Private
router.put('/:folder_id', auth, async (req, res) => {
    try {

        const {
            name,
            words
        } = req.body;

    
        const folder = await Folder.findOneAndUpdate(
            { _id: req.params.folder_id }, 
            { $set: {name, words}},
            { new: true });

            return res.json(folder);
        
   
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   DELETE api/folder/:folder_id/word/:word_id
// @desc    Delete word
// @access  Private
router.delete('/:folder_id/word/:word_id', auth, async (req, res) =>{

    try{

        const folder = await Folder.findById({ _id: req.params.folder_id });

        console.log(folder.words);
        
        // Get remove index
        const removeIndex = folder.words
        .map(item => item.id)
        .indexOf(req.params.word_id);

        if(removeIndex === -1) return res.status(404).send('Word not found');
        
        folder.words.splice(removeIndex, 1);

        await folder.save();

        res.json(folder);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;