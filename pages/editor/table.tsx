import { useEditorContext } from 'context/editor';
import React from 'react';
import PopupCreator from './popupCreator';

const Table = ({
  tableData,
  type,
  OnEditorClick,
}: {
  tableData: any;
  type: string;
  OnEditorClick: any;
}) => {
  const [createComponentPopup, setCreateComponentPopup] =
    React.useState<boolean>(false);
  const { setNewElement } = useEditorContext();

  const hanldeCreateElement = () => {
    const newTemplate = Object.fromEntries(
      Object.keys(tableData[0]).map((key) => [key, '']),
    );
    setNewElement(newTemplate);
    setCreateComponentPopup(true);
  };
  const closeAddComponent = () => {
    setCreateComponentPopup(false);
  };

  return (
    <div>
      <div className="add-button-container">
        <button className="add-button" onClick={() => hanldeCreateElement()}>
          Crear Nuevo
        </button>
      </div>
      <table className="table">
        <thead className="bg-white border-b">
          <tr>
            {Object.keys(tableData[0]).map((head) => (
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                {head}
              </th>
            ))}
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((page: any) => (
            <tr className="bg-gray-100 border-b">
              {Object.values(page).map((data: any) => (
                <>
                  {Object.prototype.toString.call(data) === '[object Array]' ? (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.length}
                    </td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data}
                    </td>
                  )}
                </>
              ))}{' '}
              <td>
                <button onClick={(e) => OnEditorClick(e, type, page)}>
                  editar
                </button>
                <button>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PopupCreator
        statePopUp={createComponentPopup}
        type={'Crear Componente'}
        OnEditorClose={closeAddComponent}
      />
    </div>
  );
};

export default Table;
