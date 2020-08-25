//module requiremnets
const child_process=require('child_process');


const calculate=(itemFullStaticPath)=>{
    let size;
    let sizeBytes;
    let data;
    let unit;
    let digit;
    //making itemFullStaticPath ready for linux
    const itemFullStaticPathLinux=itemFullStaticPath.replace(/\s/g,'\ ');
    
    data=child_process.execSync(`du -sh "${itemFullStaticPathLinux}"`).toString();
    //extracting size
    data=data.replace(/\s/g,'');
    size=data.split('/')[0];

    //extracting unit
    unit=size.replace(/\d|\./g,'');

    //extracting digits
    digit=parseFloat(size.replace(/[a-z]/i,''));

    const units="BKMGT";

    sizeBytes=digit*(Math.pow(1000,units.indexOf(unit)));
    
    return [size,sizeBytes];

}

module.exports=calculate;