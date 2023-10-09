const express = require('express');
const app = express();

const tareas = [
  {
    id: '1',
    completo: true,
    descripcion: 'Hacer las tareas',
  },
  {
    id: '2',
    completo: false,
    descripcion: 'Estudiar',
  },
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
