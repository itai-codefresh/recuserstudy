'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  withImages: Boolean,
  res: {},
  age: "String",
  gender: "String",
  bgu: "String",
  date: Date
});

module.exports = mongoose.model('Movie', ThingSchema);
