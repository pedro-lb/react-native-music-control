/**
 * @providesModule MusicControl
 * @flow
 */
'use strict';

import { NativeModules, NativeAppEventEmitter } from 'react-native';
const NativeMusicControl = NativeModules.MusicControlManager;

/**
 * High-level docs for the MusicControl iOS API can be written here.
 */
var handlers = { };
var subscription = null;

var MusicControl = {
  setNowPlaying: function(info){
    NativeMusicControl.setNowPlaying(info)
  },
  resetNowPlaying: function(){
    NativeMusicControl.resetNowPlaying()
  },
  enableContol: function(controlName, bool){
    NativeMusicControl.enableContol(controlName, bool)
  },
  handleCommand: function(commandName){
    if(handlers[commandName]){
      handlers[commandName]()
    }
  },
  on: function(actionName, cb){
    if(!subscription){
      subscription = NativeAppEventEmitter.addListener(
        'RNMusicControlEvent',
        (event) => {
          console.log("Receive event", event);
          MusicControl.handleCommand(event.name)
        }
      );
    }
    handlers[actionName] = cb
  },
  off: function(actionName, cb){
    handlers.delete(actionName);
    if(!Object.keys(handlers).length){
      subscription.remove()
      subscription = null;
    }
  }
};

module.exports = MusicControl;
