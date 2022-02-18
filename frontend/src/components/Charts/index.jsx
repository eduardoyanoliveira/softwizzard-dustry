import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { optionsBuild } from './optionsBuild';
import { dataBuild } from './dataBuild';

import { Chart, registerables } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';

import { Container } from './styles';

Chart.register(...registerables);

export function BarModel({data, height, width}) {
  const theme = useContext(ThemeContext);

  const thisData = dataBuild(data);

  const options = optionsBuild(data.title, theme.colors.fontMediumEmphasis)

  return (
    <Container  width={width}>
      <Bar options={options} data={thisData} width={width} height={height}/>
    </Container>
  );
}


export function LineModel({data, height, width}) {
  
  const theme = useContext(ThemeContext);

  const thisData = dataBuild(data, 'LINE');

  const options = optionsBuild(data.title, theme.colors.fontMediumEmphasis)

  return (
    <Container  width={width}>
      <Line options={options} data={thisData} width={width} height={height}/>
    </Container>
  );
}
