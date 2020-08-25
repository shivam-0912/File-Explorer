const path=require('path');


const breadcrumb=(pathname)=>{
    let link='/';
    let breadcrumbcont=`<li class="breadcrumb-item"><a href="/">Home</a></li>`;
    const pathElements=pathname.split('/').filter(item=>item!=='');
    pathElements.forEach((item,index) => {
        if(index!==(pathElements.length-1))
        {
            link=path.join(link,item);
            breadcrumbcont+=`<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        }
        else{
            link=path.join(link,item);
            breadcrumbcont+=`<li class="breadcrumb-item active">${item}</li>`;

        }
    });
    return breadcrumbcont;
    
}
module.exports=breadcrumb;