#!/usr/bin/env node
"use strict";

var net = require('net');
var path = require('path');
var growl = require('growl');

var argv = require('minimist')(process.argv.slice(2));

var host = argv.s || 'fritz.box';
var port = 1012;

if (argv.h) {
  console.log("fritzbox [-s host] [-h]");
  process.exit(1);
}

var socket = new net.Socket();
socket.connect(port, host);

socket.on('connect', handleConnect);
socket.on('data', handleData);
socket.on('error', handleError);

process.on('SIGINT', closeSocket);
process.on('SIGTERM', closeSocket);
process.on('SIGBREAK', closeSocket);

function handleConnect() {
  console.log('fritzgrowl connected to ' + host);
}

function handleData(data) {
  var line = data.toString();
  growlCallMonitorMessage(parseCallMonitorLine(line));
}

function growlCallMonitorMessage(m) {
  growl(textForMessage(), {
    title: titleForMessage(),
    image: imageForMessage()
  });

  function titleForMessage() {
    switch (m.type) {
      case "CALL":
        return "Outgoing call";
      case "RING":
        return "Incoming call";
      case "CONNECT":
        return "Connection established";
      case "DISCONNECT":
        return "Hang up";
    }
  }

  function textForMessage() {
    switch (m.type) {
      case "CALL":
        return "to " + m.remoteNumber;
      case "RING":
        return "from " + m.remoteNumber;
      case "CONNECT":
        return "";
      case "DISCONNECT":
        return "Duration: " + m.duration;
    }
  }

  function imageForMessage() {
    return path.resolve(__dirname, 'res/call.png');
  }
}

function parseCallMonitorLine(line) {
  var chunks = line.split(';');
  var result = {};

  result.date = chunks[0];
  result.type = chunks[1];
  result.connectionId = chunks[2];

  switch(result.type) {
    case "CALL":
      result.line = chunks[3];
      result.localNumber = chunks[4];
      result.remoteNumber = chunks[5];
      break;
    case "RING":
      result.remoteNumber = chunks[3];
      result.localNumber = chunks[4];
      break;
    case "CONNECT":
      result.line = chunks[3];
      result.number = chunks[4];
      break;
    case "DISCONNECT":
      result.duration = chunks[3];
      break;
  }
  return result;
}

function handleError(err) {
  console.error('Could not connect to ' +  host);
  if (err.code === 'ECONNREFUSED') {
    console.error('Is the CallMonitor enabled?');
  } else if (err.code === 'ENOTFOUND') {
    console.error('Host ' + host + ' not found.');
  } else {
    throw err;
  }
}

function closeSocket() {
  socket.end();
}

