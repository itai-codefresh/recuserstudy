'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  withImages: Boolean,
  res: {},
  age: "String",
  gender: "String"
});

module.exports = mongoose.model('Movie', ThingSchema);
