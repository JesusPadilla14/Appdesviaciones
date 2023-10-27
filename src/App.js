import React, { useState } from "react";
import ExcelJS from "exceljs";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el archivo CSS de Bootstrap

function App() {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    numero: "DES23-",
    fechaInicio: "",
    fechaFinal: "",
    areaAfectada: "",
    solicitadaPor: "",
    tipoDesviacion: "Proceso",
    razonDesviacion: "",
    descripcion: "",
    numeroPO: "",
    comentarios: "Cantidad desviada",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSave = () => {
    setData([...data, newEntry]);
    setNewEntry({
      numero: "DES23-",
    fechaInicio: "",
    fechaFinal: "",
    areaAfectada: "",
    solicitadaPor: "",
    tipoDesviacion: "Proceso",
    razonDesviacion: "",
    descripcion: "",
    numeroPO: "",
    comentarios: "Cantidad desviada",
    });
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Desviaciones");
  
    // Definir las columnas en la hoja de cálculo
    worksheet.columns = [
      { header: "Número", key: "numero" },
      { header: "Fecha de Inicio", key: "fechaInicio" },
      { header: "Fecha Final", key: "fechaFinal" },
      { header: "Área Afectada", key: "areaAfectada" },
      { header: "Solicitada Por", key: "solicitadaPor" },
      { header: "Tipo de Desviación", key: "tipoDesviacion" },
      { header: "Razón de la Desviación", key: "razonDesviacion" },
      { header: "Descripción", key: "descripcion" },
      { header: "Número de PO", key: "numeroPO" },
      { header: "Comentarios", key: "comentarios" }]
    
  
    // Agregar datos a la hoja de cálculo
    data.forEach((entry) => {
      worksheet.addRow(entry);
    });
  
    // Crear un blob de datos binarios de la hoja de cálculo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "desviaciones.xlsx";
      a.click();
    });
  };
  


  return (
    <div className="container mt-5">
      <form>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="numero" className="form-label">Número:</label>
            <input
              type="text"
              className="form-control"
              id="numero"
              name="numero"
              value={newEntry.numero}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio:</label>
            <input
              type="text"
              className="form-control"
              id="fechaInicio"
              name="fechaInicio"
              value={newEntry.fechaInicio}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label htmlFor="fechaFinal" className="form-label">Fecha Final:</label>
            <input
              type="text"
              className="form-control"
              id="fechaFinal"
              name="fechaFinal"
              value={newEntry.fechaFinal}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="areaAfectada" className="form-label">Área Afectada:</label>
            <input
              type="text"
              className="form-control"
              id="areaAfectada"
              name="areaAfectada"
              value={newEntry.areaAfectada}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label htmlFor="solicitadaPor" className="form-label">Solicitada Por:</label>
            <input
              type="text"
              className="form-control"
              id="solicitadaPor"
              name="solicitadaPor"
              value={newEntry.solicitadaPor}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="tipoDesviacion" className="form-label">Tipo de Desviación:</label>
            <select
              className="form-select"
              id="tipoDesviacion"
              name="tipoDesviacion"
              value={newEntry.tipoDesviacion}
              onChange={handleInputChange}
            >
              <option value="Proceso">Proceso</option>
              <option value="Producto">Producto</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="razonDesviacion" className="form-label">Razón de la Desviación:</label>
            <input
              type="text"
              className="form-control"
              id="razonDesviacion"
              name="razonDesviacion"
              value={newEntry.razonDesviacion}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              value={newEntry.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <label htmlFor="numeroPO" className="form-label">Número de PO:</label>
            <input
              type="text"
              className="form-control"
              id="numeroPO"
              name="numeroPO"
              value={newEntry.numeroPO}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="comentarios" className="form-label">Comentarios:</label>
            <input
              type="text"
              className="form-control"
              id="comentarios"
              name="comentarios"
              value={newEntry.comentarios}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </form>

      <button className="btn btn-success" onClick={exportToExcel}>Exportar a Excel</button>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Número</th>
            <th>Fecha de Inicio</th>
            <th>Fecha Final</th>
            <th>Área Afectada</th>
            <th>Solicitada Por</th>
            <th>Tipo de Desviación</th>
            <th>Razón de la Desviación</th>
            <th>Descripción</th>
            <th>Número de PO</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.numero}</td>
              <td>{entry.fechaInicio}</td>
              <td>{entry.fechaFinal}</td>
              <td>{entry.areaAfectada}</td>
              <td>{entry.solicitadaPor}</td>
              <td>{entry.tipoDesviacion}</td>
              <td>{entry.razonDesviacion}</td>
              <td>{entry.descripcion}</td>
              <td>{entry.numeroPO}</td>
              <td>{entry.comentarios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};
export default App;
