const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Articles  = require('../models/Article');
const User      = require('../models/User');


router.get('/source/:id', (req, res) => {
  Source.findOne({'id': req.params.id}).then(data =>{
    Articles.find({'source.id': req.params.id}).then(articles =>{
      articles = articles.splice(0, 2)
      res.render('profile/source', { data, articles, user: req.user });
    });
  }).catch(err=>console.log(err));
});

router.get('/source/:id/edit', (req, res) => {
  Source.findOne({ 'id': req.params.id }).then(data => {
    Articles.find({'source.id': req.params.id}).then(articles => {
      console.log('Before: ' + articles)
      articles = articles.splice(0, 2)
      console.log('After : ' + articles)
      res.render('profile/editSource', { data, articles, user: req.user });
    });
  }).catch(err => console.log(err))
})

router.post('/source/:id', (req, res) => {

  Source.updateOne({ 'id': req.params.id}, {
    'description': req.body.description,
    'politicalBias': req.body.politicalBias,
    'fundingSources': req.body.fundingSources
  }).then(data => {
    Source.find({ 'id': req.params.id}).then(data => {

      Articles.find({'source.id': req.params.id}).then(articles =>{
        data = data[0]
  
        res.render('profile/source', { data, articles, user: req.user });
      });
    })
  }).catch(err => console.log(err))
})


router.get('/user/:id',(req, res) => {
  console.log('ID: ' + req.params.id)
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user = true;
    res.render('profile/user', {data, user: req.user});
  });
})

router.get('/user/:id/edit', (req, res) => {
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user = true;
    data.username = data.username.trim()
    res.render('profile/editUser', {data, user: req.user});
  });
})

router.post('/user/:id', (req, res) => {

  if ((req.body.profileImg).trim() === 'Image URL' || '') req.body.profileImg = 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg'

  User.updateOne({ '_id': req.params.id}, {
    'username': req.body.username,
    'description': req.body.description,
    'profileImg': req.body.profileImg
  }).then(data => {
    User.findOne({ '_id': req.params.id}).then(data => {  
        res.render('profile/user', { data, user: req.user });
    })
  }).catch(err => console.log(err))
})


module.exports = router
