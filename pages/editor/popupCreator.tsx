import { useEditorContext } from 'context/editor';
import React from 'react';
import ListComponents from './listComponents';

const PopupCreator = ({
  type,
  OnEditorClose,
  statePopUp,
}: {
  type: string;
  OnEditorClose: any;
  statePopUp: boolean;
}) => {
  const { newElement } = useEditorContext();

  const fieldsRender = (key: string, index: number) => {
    const types = {
      default: () => (
        <>
          <label>{key}</label>
          <input
            type="text"
            value={Object.values(newElement)[index] as string}
          />
        </>
      ),
      components: () => {
        return(
        <>
          <label>{key}</label>
          <ListComponents items={Object.values(newElement)[index]} property={key}/>
        </>
      )},
    };
    return Object.keys(types).includes(key)
      ? types[key as keyof typeof types]()
      : types.default();
  };
  return (
    <div className={`popup-${statePopUp ? 'show' : 'close'}`}>
      <div className="overlay fixed" onClick={(()=> OnEditorClose())}></div>
      <div className="popup-container">
        <button className="cross-button" onClick={() => OnEditorClose()}>
          x
        </button>
        <h1>{type}</h1>
        <div className="inputs-container">
          {newElement
            ? Object.keys(newElement).map((key, index) =>
                fieldsRender(key, index),
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default PopupCreator;