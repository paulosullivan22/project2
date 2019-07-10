const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Articles  = require('../models/Article');
const User      = require('../models/User');


router.get('/source/:id', (req, res) => {
  Source.find({'id': req.params.id}).then(data =>{
    Articles.findOne({'source.id': req.params.id}).then(articles =>{
      res.render('profile/source', { data, articles, user: req.user });
    });
  }).catch(err=>console.log(err));
});

router.get('/source/:id/edit', (req, res) => {
  Source.find({ 'id': req.params.id }).then(data => {
    Articles.findOne({'source.id': req.params.id}).then(articles =>{
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
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user = true;
    res.render('profile/user', {data, user});
  });
})

router.get('/user/:id/edit', (req, res) => {
  User.findById({_id: req.params.id}).then(data => {
    let user = false; if(req.params.id == req.user._id) user = true;
    res.render('profile/editUser', {data, user});
  });
})

router.post('/user/:id', (req, res) => {

  

  User.updateOne({ '_id': req.params.id}, {
    'username': req.body.username,
    'description': req.body.description
  }).then(data => {
    User.find({ '_id': req.params.id}).then(data => {
        data = data[0]
  
        res.render('profile/user', { data, user: req.user });
    })
  }).catch(err => console.log(err))
})


module.exports = router
