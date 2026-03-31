import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import fs from 'fs';
import path from 'path';

const expectedStructure = ['client', 'imports', 'server'];

it('Project directory structure is correctly set up', () => {
  const dirs = fs.readdirSync('.').filter((file) => fs.statSync(file).isDirectory());
  expect(dirs).to.deep.equal(expectedStructure);
});