import { EditorContextProvider, useEditorContext } from 'context/editor';
import React from 'react';
import PopupEditor from './popupEditor';
import Table from './table';
import test from './test.json';

const index = () => {
  const [popupType, setPopupType] = React.useState<string>('');
  const [statePopUp, setStatePopUp] = React.useState<boolean>(false);
  const { setEditElement } = useEditorContext();

  const OnEditorClick = (e: any, type: string, data: any) => {
    setStatePopUp(true);
    setPopupType(type);
    setEditElement(data);
  };

  const OnEditorClose = () => {
    setStatePopUp(false);
  };
  

  return (
    <div className="editor container">
      <h1>CMS Sample</h1>
      <div className="paginas-container">
        <h2>Paginas</h2>
        <Table
          tableData={test.pages}
          type="pagina"
          OnEditorClick={OnEditorClick}
        />
      </div>
      <div className="components-container">
        <h2>Componentes</h2>
        <Table
          tableData={test.components}
          type="componente"
          OnEditorClick={OnEditorClick}
        />
      </div>
      <PopupEditor
        type={popupType}
        OnEditorClose={OnEditorClose}
        statePopUp={statePopUp}
      />
    </div>
  );
};

export default index;
