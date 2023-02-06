import { useEditorContext } from 'context/editor';
import React from 'react';
import ListComponents from './listComponents';

const ListAddPopup = ({
  type,
  OnEditorClose,
  statePopUp,
}: {
  type: string;
  OnEditorClose: any;
  statePopUp: boolean;
}) => {
  const [selectedListAdd, setSelectedListAdd] = React.useState([]);
  const { listAdd } = useEditorContext();

  const onClickElement = (item: string) => null;

  return (
    <div className={`popup-${statePopUp ? 'show' : 'close'}`}>
      <div className="overlay fixed" onClick={() => OnEditorClose()}></div>
      <div className="popup-container">
        <button className="cross-button" onClick={() => OnEditorClose()}>
          x
        </button>
        <h1>{type}</h1>
        <div className="">
          {listAdd
            ? listAdd.map((item: any) => (
                <>
                  <button
                    className={
                      selectedListAdd.includes(item.codename) ? 'active' : ''
                    }
                    onClick={(e) =>
                      onClickElement((e.target as HTMLInputElement).name)
                    }
                    name={item.codename}
                  >
                    {item.title}
                  </button>
                </>
              ))
            : null}
        </div>
        <div>
          <h2>Elementos por Añadir</h2>
          {selectedListAdd.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListAddPopup;
