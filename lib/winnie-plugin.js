'use babel';

import WinnieModel from './winnie-model';
import {
  CompositeDisposable
} from 'atom';
import path from 'path';

function open(filePath) {
  if (filePath.toLowerCase().endsWith('.js')) {
    atom.workspace.open(filePath)
  }
}

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.addOpener((uri) => {
      if(uri.startsWith(WinnieModel.kengaViewProtocol)){
        return new WinnieModel(uri.substring(WinnieModel.kengaViewProtocol.length))
      }
    }));
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'winnie-plugin:design': () => {
        const activePaneItem = atom.workspace.getActivePaneItem()
        if (typeof activePaneItem.getPath !== 'undefined') {
          open(WinnieModel.kengaViewProtocol + activePaneItem.getPath())
        } else if (typeof activePaneItem.lastFocusedEntry != 'undefined') {
          open(WinnieModel.kengaViewProtocol + activePaneItem.lastFocusedEntry.getPath())
        } else {
          console.log('Unable to determine the focused file')
        }
      }
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  deserialize(state) {
    return WinnieModel.deserialize(state)
  }
};
