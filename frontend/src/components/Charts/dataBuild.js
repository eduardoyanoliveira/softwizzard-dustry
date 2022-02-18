import { chartColors } from "../../design/colors";

export const dataBuild = (data, type) => {
    const datasets = [];
    for(let i in data.datasets){
      datasets.push({
        label: data.datasets[i].title,
        data: data.datasets[i].data,
        backgroundColor: chartColors[i].background,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: chartColors[i].border,
        barPercentage: 0.3,
        categoryPercentage: 1,
        lineTension: 0.4,        
        radius: 3      
      })
    }
  
    return {
      labels: data.labels,
      datasets
    }
  }
  