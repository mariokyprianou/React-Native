


export default getGraphTicksInterval = (highestValue) => {

    let interval;
    let ticks;

    if (highestValue >= 10) {
        // To round numbers and look more uniform
        const topLimit = Math.round(highestValue / 10) * 10;
        
        interval = topLimit / 5;
        ticks = Math.ceil(topLimit / interval);
      }
      else {
        
        interval = Math.ceil(highestValue / 5);
        ticks = Math.ceil(highestValue / interval);
     }

     return {ticks, interval};
}