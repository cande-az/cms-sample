import { useEditorContext } from 'context/editor';
import React from 'react';
import ListAddPopup from './listAddPopup';
import PopupCreator from './popupCreator';

const ListComponents = ({
  items,
  property,
}: {
  items: any;
  property: string;
}) => {
  const { setEditElement, editElement, setNewElement } = useEditorContext();

  const [selectElement, setSelectelement] = React.useState<string | boolean>(
    false,
  );
  const [selectElementIndex, setSelectelementIndex] = React.useState<
    number | boolean
  >(false);
  const onClickElement = (item: string, index: number) => {
    // console.log('index', index);
    if (selectElement !== item) {
      setSelectelement(item);
      setSelectelementIndex(index);
    } else {
      setSelectelement(false);
      setSelectelementIndex(false);
    }
  };

  const handleMove = (dir: string) => {
    const itemsCopy = items;
    if (dir === 'up') {
      const a = itemsCopy[selectElementIndex as number];
      itemsCopy[selectElementIndex as number] =
        itemsCopy[(selectElementIndex as number) - 1];
      itemsCopy[(selectElementIndex as number) - 1] = a;
    } else if (dir === 'down') {
      const a = itemsCopy[selectElementIndex as number];
      itemsCopy[selectElementIndex as number] =
        itemsCopy[(selectElementIndex as number) + 1];
      itemsCopy[(selectElementIndex as number) + 1] = a;
    }
    setEditElement({ ...editElement, [`${property}`]: itemsCopy });
  };

  const handleErase = (codename: string) => {
    // console.log('entor', codename);
    let itemsCopy = items;
    itemsCopy = itemsCopy.filter((item: any) => item.codename !== codename);
    setEditElement({ ...editElement, [`${property}`]: itemsCopy });
  };

  const hanldeAddComponent = () => null;

  return (
    <div className="list-components">
      <div className="add-button-container">
        <button className="add-button" onClick={() => hanldeAddComponent()}>
          Agregar Componente
        </button>
      </div>
      <div className="components-render">
        <div className="elements-list">
          {items ? (
            items.map((item: any, index: number) => (
              <>
                <button
                  className={selectElement === item.codename ? 'active' : ''}
                  onClick={(e) =>
                    onClickElement((e.target as HTMLInputElement).name, index)
                  }
                  name={item.codename}
                >
                  {item.title}
                </button>
              </>
            ))
          ) : (
            <p>Sin componentes</p>
          )}
        </div>
        {selectElement ? (
          <div className="component-detail">
            <h3>Nombre</h3>
            <p>{selectElement}</p>
            <h3>Acciones</h3>
            <div className="actions-container">
              <button
                onClick={() => {
                  handleMove('up');
                  setSelectelementIndex(
                    selectElementIndex !== 0
                      ? (selectElementIndex as number) - 1
                      : 0,
                  );
                }}
                disabled={selectElementIndex === 0}
              >
                Subir
              </button>
              <button
                onClick={() => {
                  handleMove('down');
                  setSelectelementIndex(
                    selectElementIndex !== items.length - 1
                      ? (selectElementIndex as number) + 1
                      : items.length - 1,
                  );
                }}
                disabled={selectElementIndex === items.length - 1}
              >
                Bajar
              </button>
              <button onClick={() => handleErase(selectElement as string)}>
                Eliminar
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <ListAddPopup type={''} OnEditorClose={undefined} statePopUp={false} />
    </div>
  );
};

export default ListComponents;
