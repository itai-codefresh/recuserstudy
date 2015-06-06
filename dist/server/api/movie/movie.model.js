'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  withImages: Boolean,
  res: {}
});

module.exports = mongoose.model('Movie', ThingSchema);
