import fs from "fs";

export const addGastosQuery = async (newGasto) => {
    try {
        const gastos = JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf-8")
        );
        gastos.gastos.push(newGasto);
        fs.writeFileSync("./data/gastos.json", JSON.stringify(gastos));
        return gastos;
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
};

export const getGastosQuery = async () => {
    try {
        const gastos = JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf-8")
        );
        return gastos;
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
}

export const updateGastosQuery = async (newGasto) => {
    const { id } = newGasto;
    try {
      let { gastos}= JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
      gastos = gastos.map((gasto) => {
        if (gasto.id === id) {
          return newGasto;
        } else {
          return gasto;
        }
      });
      fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
      return gastos;
    } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
    }
  };

  export const deleteGastosQuery = async (id) => {
    try {
      let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
      /* gastos.gastos = gastos.gastos.filter((gasto) => gasto.id !== id); */
  
      gastos = gastos.filter((gasto) => gasto.id !== id);
      fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
      return gastos;
    } catch (error) {
      console.log("Error code: ", error.code, "Error message: ", error.message);
    }
  };

  export const recalcularMontoGastos = () => {
    //lectura del archivo JSON una sola vez al principio de la funcion
    const { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    const { roommates } = JSON.parse(fs.readFileSync("./data/roommates.json", "utf-8"));
    /* const gastos = gastosData.gastos;
    const roommates = roommatesData.roommates; */
    
    // Inicialización de las deudas y créditos de cada roommate
    roommates.forEach((r) => {
      r.debe = 0;
      r.recibe = 0;
      r.total = 0;
    });
  
    // Cálculo de deudas y créditos
    gastos.forEach((g) => { //itera sobre cada gasto
      const montoPorPersona = g.monto / roommates.length;
      /* Luego iteramos sobre cada roommate para asignar los gastos correspondientes */
  
      /* 
      Dentro del segundo bucle, se verifica si el nombre del compañero de cuarto actual (r.nombre) coincide con el nombre del compañero de cuarto asociado al gasto (g.roommate).
      
      Si hay una coincidencia, se suma al recibe del compañero de cuarto la cantidad calculada para ese gasto, multiplicada por el número total de compañeros menos uno (para evitar que se le sume al propio gasto).
  
      Si no hay una coincidencia, se resta al debe del compañero de cuarto la cantidad calculada para ese gasto.
  
      Finalmente, se actualiza el total para cada compañero de cuarto restando lo que debe al recibir.
      */
      roommates.forEach((r) => {
        if (g.roommate === r.nombre) {
          r.recibe += montoPorPersona * (roommates.length - 1);
        } else {
          r.debe -= montoPorPersona;
        }
        r.total = r.recibe - r.debe;
      });
    });
  
    // Escritura del archivo JSON con los datos actualizados
  fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
  
  
  };