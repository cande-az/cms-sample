import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext(null);

export function useEditorContext(): any {
  return useContext(EditorContext as any);
}

export function EditorContextProvider({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  const [hello, setHello] = useState();
  const [editElement, setEditElement] = React.useState();
  const [newElement, setNewElement] = React.useState();
  const [listAdd, setListAdd] = React.useState();

  const value = {
    hello,
    editElement,
    setEditElement,
    newElement,
    setNewElement,
    listAdd,
    setListAdd,
  };

  return (
    <EditorContext.Provider value={value as any}>
      {children}
    </EditorContext.Provider>
  );
}
