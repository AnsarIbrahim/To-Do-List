import { saveLocal } from './live.js';

export default function edit(text, i, list) {
  list[i].description = text.value;
  saveLocal(list);
  return list;
}
