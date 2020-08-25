let children=$('tbody').children();//children is an object here

let childrenarr=[];
for(let i=0;i<children.length;i++)
{
    childrenarr.push(children[i]);
}

let itemsarr=[];
childrenarr.forEach(item=>{
    
    let itemdetails={
        'name':item.getAttribute('data-name'),
        'size':parseInt(item.getAttribute('data-size')),
        'timestamp':parseInt(item.getAttribute('data-timestamp')),
        'html':item.outerHTML
    }
    itemsarr.push(itemdetails);
});

//sort status
let sortstatus={
    name:'none',
    size:'none',
    timestamp:'none'
}



function sort(sorttype,type){
    let value1;
    let value2;
   
    
        itemsarr.sort((item1,item2)=>
        {
            if(type==='name'){
            value1=item1[type].toUpperCase();
            value2=item2[type].toUpperCase();
            }
            else{
            value1=item1[type];
            value2=item2[type];
            }
            if(value1>value2){
                return 1;
            }
            else if(value1<value2){
                return -1;
            }
            else{
                return 0;  
            }
        })
        


        
    sortstatus[type]='up';    
    
    if(sorttype==='desc'){
        itemsarr=itemsarr.reverse();
        sortstatus[type]='down'; 
    }
    // console.log(itemsarr);

    const content=itemsarr.map(item=>item['html']).join('');
    // console.log(content);
    $('tbody').html(content);
  


}
document.getElementById('tableheadrow').addEventListener('click',function(data){

    // console.log(data.target.id)
    // console.log(sortstatus[data.target.id])
    if(data.target){
        //clear icons
        $('ion-icon').remove();
    }
    if(['none','down'].includes(sortstatus[data.target.id])){
        sort('asc',data.target.id);
        //adding icon
        data.target.innerHTML+='<ion-icon name="arrow-up-circle"></ion-icon>';
    }
    else{
        sort('desc',data.target.id);
        //adding icon
        data.target.innerHTML+='<ion-icon name="arrow-down-circle"></ion-icon>';
    }
})

