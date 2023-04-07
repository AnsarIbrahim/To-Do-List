import { saveLocal } from './live.js';

export default function edit(text, i, list) {
  if (text.value.length > 0) {
    list[i].description = text.value;
    saveLocal(list);
  }
  return list;
}
