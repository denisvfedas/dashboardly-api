const express = require('express');

const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = (dataLoader) => {
  const bookmarksController = express.Router();

  // Modify a bookmark
  bookmarksController.patch('/:id', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
      return dataLoader.updateBookmark(req.params.id, {
        url: req.body.url,
        title: req.body.title
      });
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(400).json(err));
    //res.status(500).json({ error: 'not implemented' });
    
    
  });


  // Delete a bookmark
  bookmarksController.delete('/:id', onlyLoggedIn, (req, res) => {
    // TODO: this is up to you to implement :)
    dataLoader.bookmarkBelongsToUser(req.params.id, req.user.users_id)
    .then(() => {
      return dataLoader.deleteBookmark(req.params.id);
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(400).json(err));
  });
  //   res.status(500).json({ error: 'not implemented' });
  // });

  return bookmarksController;
};
