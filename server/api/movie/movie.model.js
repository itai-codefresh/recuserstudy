'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  withImages: Boolean
});

module.exports = mongoose.model('', ThingSchema);
