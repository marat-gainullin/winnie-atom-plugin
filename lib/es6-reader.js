'use babel';
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import fs from 'fs';

export default function readEs6(filePath, encoding = 'utf-8') {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const imports = {};
            const variables = {};
            const bodies = {};
            const parents = {};
            let classes = 0;
            let constructors = 0;
            try {
              const ast = parser.parse(data, {
                sourceType: "module"
              });
              traverse(ast, {
                enter(path) {
                  if (
                    t.isImportDeclaration(path.node) &&
                    t.isStringLiteral(path.node.source) &&
                    Array.isArray(path.node.specifiers) &&
                    path.node.specifiers.length === 1 &&
                    t.isImportDefaultSpecifier(path.node.specifiers[0]) &&
                    t.isIdentifier(path.node.specifiers[0].local)
                  ) {
                    imports[path.node.specifiers[0].local.name] = path.node.source.value;
                  }
                  if (t.isClassDeclaration(path.node)) {
                    classes++;
                  }
                  if (t.isClassMethod(path.node) && path.node.kind === 'constructor') {
                    constructors++;
                    path.node.body.body.forEach((constructorItem, i) => {
                      if (t.isVariableDeclaration(constructorItem)) {
                        constructorItem.declarations.forEach((item, i) => {
                          if (t.isVariableDeclarator(item) && t.isIdentifier(item.id) && t.isNewExpression(item.init) && t.isIdentifier(item.init.callee)) {
                            variables[item.id.name] = item.init.callee.name;
                          }
                        });
                      }
                    });
                  }
                  if (classes === 1 &&
                    t.isAssignmentExpression(path.node) &&
                    t.isMemberExpression(path.node.left)
                  ) {
                    const memberPath = [path.node.left.property.name];
                    let objectNode = path.node.left.object;
                    while (t.isMemberExpression(objectNode)) {
                      memberPath.unshift(objectNode.property.name);
                      objectNode = objectNode.object;
                    }
                    if (t.isIdentifier(objectNode)) {
                      if (!bodies[objectNode.name]) {
                        bodies[objectNode.name] = {};
                      }
                      const body = bodies[objectNode.name];
                      const property = memberPath.join('.');
                      if (t.isStringLiteral(path.node.right)) {
                        body[property] = path.node.right.value;
                      } else if (t.isNumericLiteral(path.node.right)) {
                        body[property] = path.node.right.value;
                      } else if (t.isBooleanLiteral(path.node.right)) {
                        body[property] = path.node.right.value;
                      }
                    }
                  }
                  if (t.isCallExpression(path.node) &&
                    t.isMemberExpression(path.node.callee) &&
                    t.isIdentifier(path.node.callee.object) && t.isIdentifier(path.node.callee.property) &&
                    path.node.arguments.length === 1 && t.isIdentifier(path.node.arguments[0]) &&
                    (path.node.callee.property.name === 'add' || path.node.callee.property.name === 'addColumnNode') &&
                    variables[path.node.callee.object.name] && variables[path.node.arguments[0].name]) {
                    const container = path.node.callee.object.name;
                    const widget = path.node.arguments[0].name;
                    parents[widget] = container;
                  }
                }
              })
              if (classes !== 1) {
                throw Error('One and only one class is expected to be a Kenga view');
              }
              if (constructors !== 1) {
                throw Error('One and only one constructor of Kenga view class is expected');
              }
              const widgets = {};
              for (name in variables) {
                const type = variables[name];
                if (type && imports[type]) {
                  const widget = {
                    from: imports[type],
                    body: (bodies[name] || {}),
                    children: {}
                  };
                  widgets[name] = widget;
                }
              }
              const view = {};
              for (name in widgets) {
                const widget = widgets[name];
                if (parents[name] && widgets[parents[name]]) {
                  const parent = widgets[parents[name]];
                  parent.children[name] = widget;
                } else {
                  view[name] = widget;
                }
              }
              resolve(view);
            } catch (ex) {
              reject(ex);
            }
          }
      });
  });
};
