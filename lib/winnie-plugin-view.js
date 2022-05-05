'use babel';

import Invoke from 'septima-utils/invoke';
import Model from 'winnie/model';
import kenga from 'winnie/palette/kenga';
import templates from 'winnie/templates';
import modelToEs6 from 'winnie/serial/model-to-code';
import fs from 'fs';

export default class WinnieDesignerView {

  constructor(fileModel) {
    const self = this;

    this.fileModel = fileModel;
    this.saving = false;

    const model = new Model();

    model.alert = (msg) => { atom.notifications.addError(msg); }
    model.palette.add(kenga);
    model.adopts.add(templates);

    model.layout.ground.element.classList.add('native-key-bindings');
    model.layout.ground.element.style.width = '100%';
    model.layout.ground.element.style.height = '100%';

    model.layout.properties.showOddRowsInOtherColor = false;
    model.layout.tOpen.visible = false;
    model.layout.tExport.visible = false;
    model.layout.tSave.toolTipText = 'Save';

    const edit = model.edit;
    model.edit = (body) => {
      edit.call(model, body);
      fileModel.didChangeModified(true);
    };
    model.save = (path) => {
      if (!path) {
        path = fileModel.file.path;
      }
      const generatedCode = modelToEs6(model);
      model.layout.widgets.element.focus();
      self.saving = true;
      return new Promise((resolve, reject) => {
          fs.writeFile(path, generatedCode, 'utf-8', err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
        .then(() => {
          self.saving = false;
          model.edits = [];
          model.editsCursor = 0;
          model.checkEnabled();
          fileModel.didChangeModified(false);
        })
        .catch(err => {
          self.saving = false;
          atom.notifications.addError(err);
        });
    };

    this.model = model;
    // Publish root element
    this.element = model.layout.ground.element;

    if (
      atom.workspace && atom.workspace.getCenter() &&
      atom.workspace.getCenter().paneContainer &&
      atom.workspace.getCenter().paneContainer.element
    ) {
      Invoke.later(() => {
        const split = model.layout.paletteExplorerSplit;
        const paneContainer = atom.workspace.getCenter().paneContainer.element;
        split.dividerLocation = paneContainer.offsetHeight / 2;
      });
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  isModified() {
    return this.model.edits.length > 0;
  }

  save() {
    return this.model.save();
  }

  saveAs(path) {
    return this.model.save(path);
  }
}
