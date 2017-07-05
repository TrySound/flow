/*
 * @flow
 * @lint-ignore-every LINE_WRAP1
 */


import {suite, test} from '../../tsrc/test/Tester';

export default suite(({addFile, addFiles, addCode}) => [
  test('Do not allow unreachable switch case with union string literal', [
    addCode(`
      type T = 'A' | 'B';
      const t: T = 'A';
      switch (t) {
        case 'A':
          break;
        case 'B':
          break;
        case 'C':
          break;
      }
    `)
      .newErrors(
        `
          test.js:8
            8: case 'C':
                    ^^ case \`C\` is unreachable
        `,
      )
  ]),
  test('Do not allow unreachable switch case with union objects with string literal', [
    addCode(`
      type T = { type: 'A' } | { type: 'B' };
      const t: T = { type: 'A' };
      switch (t.type) {
        case 'A':
          break;
        case 'B':
          break;
        case 'C':
          break;
      }

    `)
      .newErrors(
        `
          test.js:8
            8: case 'C':
                    ^^ case \`C\` is unreachable
        `,
      )
  ]),
]);
