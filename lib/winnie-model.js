'use babel';

import path from 'path';
import fs from 'fs';
import {
  Emitter,
  File,
  CompositeDisposable
} from 'atom';
import WinnieDesignerView from './winnie-plugin-view';
import readEs6 from './es6-reader';

// Winie model for a view file
export default class WinnieModel {
  static kengaViewProtocol = 'kenga-view://';

  static deserialize({
    filePath
  }) {
    if (fs.existsSync(filePath)) {
      return new WinnieModel(filePath)
    } else {
      console.warn(`Could not deserialize Winnie editor for path '${filePath}' because that file doesn't longer exist`)
    }
  }

  constructor(filePath) {
    const self = this;
    this.emitter = new Emitter()
    this.file = new File(filePath)
  }

  get file() {
    return this.dataFile;
  }

  set file(value) {
    const self = this;
    if (this.dataFile) {
      this.fileSubscriptions.dispose();
      this.fileSubscriptions = null;
    }
    this.dataFile = value;
    if (this.dataFile) {
      this.fileSubscriptions = new CompositeDisposable()
      this.fileSubscriptions.add(this.dataFile.onDidDelete(() => {
        self.destroy();
      }))
      this.fileSubscriptions.add(this.dataFile.onDidChange((e) => {
        self.changed();
        self.emitter.emit('did-change', e);
      }));
      this.fileSubscriptions.add(this.dataFile.onDidRename((e) => {
        self.emitter.emit('did-change-title', e);
      }));
      self.changed();
    }
  }

  copy() {
    return new WinnieModel(this.getPath())
  }

  get element() {
    return (this.view && this.view.element) || document.createElement('div')
  }

  get view() {
    if (!this.editorView) {
      try {
        this.editorView = new WinnieDesignerView(this)
      } catch (e) {
        console.warn(`Could not create WinnieDesignerView. The file could be deleted.`)
        return
      }
    }
    return this.editorView
  }

  serialize() {
    return {
      filePath: this.getPath(),
      deserializer: this.constructor.name
    }
  }

  isModified() {
    return this.editorView && this.editorView.isModified();
  }

  shouldPromptToSave() {
    return this.isModified();
  }

  save() {
    if (this.editorView) {
      return this.editorView.save();
    } else {
      return Promise.resolve();
    }
  }

  saveAs(filePath) {
    const self = this;
    if (this.editorView) {
      return this.editorView.saveAs(filePath).then(() => {
        self.file = new File(filePath);
        self.emitter.emit('did-change');
        self.emitter.emit('did-change-title');
      });
    } else {
      return Promise.resolve();
    }
  }

  changed() {
    const self = this;
    if (!this.isModified() && !self.view.saving) {
      readEs6(this.file.path)
        .then(view => {
          self.view.model.openParsedJson(view);
        })
        .catch(err => {
          self.destroy();
          if (typeof err === 'string') {
            atom.notifications.addError(err);
          } else if (typeof err === 'object') {
            if (err.message) {
              atom.notifications.addError(`Can't load view file ${self.file.path} due to ${err.message}`);
            } else {
              atom.notifications.addError(`Can't load view file ${self.file.path} due to ${JSON.stringify(err)}`);
            }
          } else {
            atom.notifications.addError(`Can't load view file ${self.file.path}`);
          }
        });
    }
  }

  terminatePendingState() {
    if (this.isEqual(atom.workspace.getCenter().getActivePane().getPendingItem())) {
      this.emitter.emit('did-terminate-pending-state')
    }
  }

  onDidTerminatePendingState(callback) {
    return this.emitter.on('did-terminate-pending-state', callback)
  }

  onDidChangeModified(callback) {
    return this.emitter.on('did-change-modified', callback)
  }

  didChangeModified(status) {
    this.emitter.emit('did-change-modified', status);
  }

  // Register a callback for when the view file changes
  onDidChange(callback) {
    return this.emitter.on('did-change', callback)
  }

  // Register a callback for when the view's title changes
  onDidChangeTitle(callback) {
    return this.emitter.on('did-change-title', callback)
  }

  // Essential: Invoke the given callback when the editor is destroyed.
  //
  // * `callback` {Function} to be called when the editor is destroyed.
  //
  // Returns a {Disposable} on which `.dispose()` can be called to unsubscribe.
  onDidDestroy(callback) {
    return this.emitter.on('did-destroy', callback)
  }

  destroy() {
    this.fileSubscriptions.dispose();
    if (this.editorView) {
      this.editorView.destroy();
    }
    this.emitter.emit('did-destroy');
  }

  getAllowedLocations() {
    return ['center'];
  }

  // Retrieves the filename of the open file.
  //
  // This is `'untitled view'` if the file is new and not saved to the disk.
  //
  // Returns a {String}.
  getTitle() {
    const filePath = this.getPath();
    if (filePath) {
      return `${path.basename(filePath)} - Kenga view`;
    } else {
      return 'untitled view';
    }
  }

  // Retrieves the absolute path to the view.
  //
  // Returns a {String} path.
  getPath() {
    return this.file.getPath();
  }

  // Retrieves the URI of the view.
  //
  // Returns a {String}.
  getURI() {
    return WinnieModel.kengaViewProtocol + this.getPath();
  }

  // Retrieves the encoded URI of the view.
  //
  // Returns a {String}.
  getEncodedURI() {
    return WinnieModel.kengaViewProtocol + encodeURI(this.getPath().replace(/\\/g, '/')).replace(/#/g, '%23').replace(/\?/g, '%3F');
  }

  // Compares two {WinnieModel}s to determine equality.
  //
  // Equality is based on the condition that the two URIs are the same.
  //
  // Returns a {Boolean}.
  isEqual(other) {
    return other instanceof WinnieModel && (this.getURI() === other.getURI());
  }
}
