const express = require('express');
const { db } = require('../utils/db');

const clientRouter = express.Router();

clientRouter
  .get('/', (req, res) => {
    res.render('client/view-all', {
      clients: db.getAll(),
    });
  })

  .get('/:id', (req, res) => {
    res.render('client/one', {
      client: db.getOne(req.params.id),
    });
  })

  .post('/', (req, res) => {
    const id = db.create(req.body);
    res.render('client/added', {
      name: req.body.name,
      id,
    });
  })

  .put('/edit/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res.render('client/changes', {
      id: req.params.id,
    });
  })

  .delete('/:id', (req, res) => {
    db.delete(req.params.id);
    res.render('client/deleted');
  })

  .get('/add/client', (req, res) => {
    res.render('client/forms/add');
  })

  .get('/edit/:id', (req, res) => {
    res.render('client/forms/edit', {
      client: db.getOne(req.params.id),
    });
  });

module.exports = {
  clientRouter,
};
