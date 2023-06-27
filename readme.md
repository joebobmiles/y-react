# Yjs React Bindings

This project provides a set of components and hooks for working with Yjs in a
React-friendly way.

## Get Started

```jsx
import React, { useEffect } from 'react'
import { render } from 'react-dom'

import {
  DocumentProvider,
  useDoc,
  useMap,
  useWebRtc
} from '@joebobmiles/y-react'

const App = () => {
  const doc = useDoc()

  useWebRtc(doc, 'counter-demo')

  const { get, set } = useMap('state')

  useEffect(
    () => {
      set('count', 0)
    },
    []
  )

  return (
    <main>
      <p>{get('count')}</p>
      <button onClick={() => set('count', get('count') + 1)}>+</button>
    </main>
  )
}

render(
  <DocumentProvider>
    <App />
  </DocumentProvider>,
  document.getElementById('app-root')
)
```

## API

### DocumentProvider Component

A context provider that all hooks and components in this library relies on. Any
components that use `y-react` components and hooks cannot be used outside the
context of a `DocumentProvider`!

The `DocumentProvider` will create a new Yjs document under the hood and make
sure that a reference to it is persisted between renders. If you want to provide
your own document (for instance, if you are using [zustand-middleware-yjs](https://github.com/joebobmiles/zustand-middleware-yjs)), 
the `DocumentProvider` has a property called `doc` that allows you to do so:

```jsx
const doc = new Y.Doc()

// ...

<DocumentProvider doc={doc}>
  <App />
</DocumentProvider>
```

Sub-documents can be created by simply nesting `DocumentProviders`:

```jsx
<DocumentProvider>
  <DocumentProvider>
    <SubApp />
  </DocumentProvider>
</DocumentProvider>
```

Note that components contained in a nested document provider cannot access data
stored in the parent document!

Sub-documents can be organized by giving them individual names and even 'folder'
names. A 'folder' in a document is simply a Y.Map that stores other documents,
which use either the unique name provided or their document GUID as the key.

```jsx
const doc = new Y.Doc()

// ...

<DocumentProvider doc={doc}>
  <DocumentProvider folderName="foo" documentName="bar">
    <SubApp />
  </DocumentProvider>
</DocumentProvider>

// ...

const subDoc = doc.get('foo').get('bar')
```

Because the sub-document uses its GUID as its index in the super-document by
default, you cannot access a sub-document outside of the given components and
hooks unless you provide it with a unique name.

### useDoc Hook

A hook that gives you access to the document managed by the DocumentProvider.
Only useful if you want to access the document directly, or to initialize a Yjs
provider.

### useProvider Hook

A hook that gives you access to the providers attached to the current document.
Only useful if you want to access a provider directly.

### useMap Hook

A hook that allows you to create and access new `Y.Map` shared types in your
document. 