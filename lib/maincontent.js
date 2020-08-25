//module requirements
const fs=require('fs');
const path=require('path');

//file imports
const calculatesizeD=require('./calculatesizeD');
const calculatesizeF=require('./calculatesizeF');

const maincontent=(fullStaticPath,pathname)=>{
    let items;
    let content='';
    try{
         items=fs.readdirSync(fullStaticPath);
    }
    catch(err){
        console.log(`readdirSync error: ${err}`);
        return `<div class="alert alert-danger">Internal Server Error</div>`;
    }
    //remove .DS_Store
    items = items.filter(element => element !== '.DS_Store');
    items.forEach(item=>{
        const itemFullStaticPath=path.join(fullStaticPath,item);
        const link=path.join(pathname,item);
        let icon;
        let stat;
        let linktarget;
        try{
            stat=fs.statSync(itemFullStaticPath);
        }
        catch(err){
            console.log(`statSync error: ${err}`);
            mainContent = `<div class="alert alert-danger">Internal server error</div>`;
            return false;
        }
        if(stat.isDirectory()){
            icon='folder';
            [itemsize,itemsizeBytes]=calculatesizeD(itemFullStaticPath);
            linktarget='';

        }
        else if(stat.isFile())
        {
            icon='document';
            [itemsize,itemsizeBytes]=calculatesizeF(stat);
            linktarget="_blank";
        }

        //timestamp in numbers
        let timestampint=parseInt(stat.mtimeMs);

        //converting timestamp to date
        let timestamp=new Date(timestampint);

        //converting date to our form
        timestamp=timestamp.toLocaleString();



        content+=`  <tr data-name="${item}" data-size="${itemsizeBytes}" data-timestamp="${timestampint}" >
            <td><ion-icon name=${icon}></ion-icon><a href="${link}" target="${linktarget}">${item}</a></td>
            <td>${itemsize}</td>
            <td>${timestamp}</td>
            </tr>`
    });
    return content;
}
module.exports=maincontent;