

// Importa el layout y otros componentes que desees utilizar
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';

// @mui material components
import Grid from '@mui/material/Grid';
import { FormControl } from '@mui/material';


function Booking() {
  const [hospital, setHospital] = useState(null);
  const [especialidad, setEspecialidad] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [intervalo, setIntervalo] = useState(null);
  const [dias, setDias] = useState([]);
  const [error, setError] = useState('');

  const intervaloOptions = [
    { value: '15', label: '15' },
    { value: '30', label: '30' },
    { value: '45', label: '45' },
    { value: '60', label: '60' },
  ];

  const daysOptions = [
    { value: 'Monday', label: 'Lunes' },
    // ... otros días de la semana
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      hospital: hospital.value,
      especialidad: especialidad.value,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      intervalo: intervalo.value,
      dias: dias.map(dia => dia.value),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/agenda/', data);
      console.log('Agenda creada:', response.data);
    } catch (error) {
      setError('Hubo un error al crear la agenda.');
      console.error(error);
    }
  };

  const lista_hospitales = [
    { value: '1', label: 'Hospital 1' },
    { value: '2', label: 'Hospital 2' },
    { value: '3', label: 'Hospital 3' },
  ];

  const lista_especialidades = [
    { value: '1', label: 'Especialidad 1' },
    { value: '2', label: 'Especialidad 2' },
    { value: '3', label: 'Especialidad 3' },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={4} p={2} boxShadow={3}>
        <SuiBox mb={1.5} display="flex" justifyContent="space-between" alignItems="center">
          <SuiTypography variant="h6" fontWeight="medium">
            Crear Agenda
          </SuiTypography>
          <SuiButton variant="gradient" buttonColor="dark" type="submit" onClick={handleSubmit}>
            Guardar
          </SuiButton>
        </SuiBox>
        <FormControl component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Campos del formulario */}
            <Grid item xs={12} md={6}>
              <label>
                Lugar:
                <Select value={hospital} onChange={setHospital} options={lista_hospitales} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Profesional:
                <Select value={especialidad} onChange={setEspecialidad} options={lista_especialidades} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Fecha Inicio:
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Fecha Fin:
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Hora Inicio:
                <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Hora Fin:
                <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Intervalo:
                <Select value={intervalo} onChange={setIntervalo} options={intervaloOptions} />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                Días:
                <Select isMulti value={dias} onChange={setDias} options={daysOptions} />
              </label>
            </Grid>
            </Grid>
        </FormControl>
        {error && <div className="error">{error}</div>}
      </SuiBox>
    </DashboardLayout>
  );
}

// Renderiza el componente App en el elemento raíz de tu HTML
export default Booking;
