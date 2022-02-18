export const optionsBuild = (title, textColor) => { 

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels : {
            color: textColor,
            pointStyle: true,
            font: {
              size: 25
            }
          }
        },
        title: {
          display: true,
          text: title,
          color: textColor,
          font: {
            size: 20,
            weight: 'normal'
          }
        },
      },
      scales:{
        y:{
          grid:{
            tickLength: 50,
            color: '#33446226'
          },
          ticks:{
            textStrokeWidth: 20,
            font:{
              family: "Verdana",
            },
            color: textColor,
            callback: function(value, index, values) {
                if(parseInt(value) >= 1000){
                  return value.toString().substring(0, value.toString().length - 3) + 'K';
                } else {
                  return + value;
                }
            },
          }
        },
        x:{
          grid:{
            display: false,
          }, 
          ticks: {
              font:{
                  family: "Verdana",
              },
              color: textColor,
          }
        }
      }
    }
  };
  