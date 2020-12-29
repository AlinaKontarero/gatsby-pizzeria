import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar:
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub item:
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new doc ID instead of random numbers:
            .documentId('downtown')
        ),
      // add in the rest of the doc items:
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
