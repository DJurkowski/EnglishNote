const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Folder = require('../../models/Folder');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {

    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [
    auth, 
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        folders,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;
    if(status) profileFields.status = status;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    if(folders) profileFields.folders = folders;
    // else profileFields.folders = {};
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    else profileFields.social.youtube = '';
    if(twitter) profileFields.social.twitter = twitter;
    else profileFields.social.twitter = '';
    if(facebook) profileFields.social.facebook = facebook;
    else profileFields.social.facebook = '';
    if(linkedin) profileFields.social.linkedin = linkedin;
    else profileFields.social.linkedin = '';
    if(instagram) profileFields.social.instagram = instagram;
    else profileFields.social.instagram = '';

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                            { user: req.user.id }, 
                            { $set: profileFields},
                            { new: true });
            
            return res.json(profile);
        }
        
        // Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', 
        ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found'});

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(400).json({ msg: 'Profile not found'});
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & folders
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {

        // @todo - remove users folders

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted '});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   Get api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async (req, res) => {

    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&
            client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };  

        request(options, (error, response, body)=>{
            if(error) console.error(error);

            if(response.statusCode !== 200){
                return res.status(400).json({ msg: 'No Github profile found' })
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }

});
module.exports = router;