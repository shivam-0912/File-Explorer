const calculate=(stat)=>{
    let size;
    let sizeBytes;
    sizeBytes=stat.size;

    //size
    const units="BKMGT";
    let unit=units[Math.floor(Math.log10(sizeBytes)/3)];

    let digit=(sizeBytes/Math.pow(1000,units.indexOf(unit))).toFixed(1);

    size=`${digit}${unit}`;
    return [size,sizeBytes];

}

module.exports=calculate;