import { useEditorContext } from 'context/editor';
import React from 'react';
import ListComponents from './listComponents';

const PopupEditor = ({
  type,
  OnEditorClose,
  statePopUp,
}: {
  type: string;
  OnEditorClose: any;
  statePopUp: boolean;
}) => {
  const { editElement } = useEditorContext();

  const fieldsRender = (key: string, index: number) => {
    const types = {
      default: () => (
        <>
          <label>{key}</label>
          <input
            type="text"
            value={Object.values(editElement)[index] as string}
          />
        </>
      ),
      components: () => {
        return(
        <>
          <label>{key}</label>
          <ListComponents items={Object.values(editElement)[index]} property={key}/>
        </>
      )},
    };
    return Object.keys(types).includes(key)
      ? types[key as keyof typeof types]()
      : types.default();
  };
  return (
    <div className={`popup-${statePopUp ? 'show' : 'close'}`}>
      <div className="overlay"  onClick={(()=> OnEditorClose())}></div>
      <div className="popup-container">
        <button className="cross-button" onClick={() => OnEditorClose()}>
          x
        </button>
        <h1>{type}</h1>
        <div className="inputs-container">
          {editElement
            ? Object.keys(editElement).map((key, index) =>
                fieldsRender(key, index),
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default PopupEditor;
