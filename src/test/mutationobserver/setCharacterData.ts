/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava';
import { documentForTesting as document } from '../../worker-thread/dom/Document';
import { MutationRecord, MutationRecordType } from '../../worker-thread/MutationRecord';

test.cb('Text, set data', t => {
  const text = document.createTextNode('original text');
  const observer = new document.defaultView.MutationObserver(
    (mutations: MutationRecord[]): void => {
      t.deepEqual(mutations, [
        {
          type: MutationRecordType.CHARACTER_DATA,
          target: text,
          value: 'new text',
          oldValue: 'original text',
        },
      ]);
      observer.disconnect();
      t.end();
    },
  );

  document.body.appendChild(text);
  observer.observe(document.body);
  text.data = 'new text';
});

test.cb.serial('Text, set textContent', t => {
  const text = document.createTextNode('original text');
  const observer = new document.defaultView.MutationObserver(
    (mutations: MutationRecord[]): void => {
      t.deepEqual(mutations, [
        {
          type: MutationRecordType.CHARACTER_DATA,
          target: text,
          value: 'new text',
          oldValue: 'original text',
        },
      ]);
      observer.disconnect();
      t.end();
    },
  );

  document.body.appendChild(text);
  observer.observe(document.body);
  text.textContent = 'new text';
});
