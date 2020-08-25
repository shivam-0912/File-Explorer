//requirments
const url=require('url');
const path=require('path');
const fs=require('fs');

//file imports
const breadcrumb=require('./breadcrumb.js');
const maincontent=require('./maincontent.js');
const getMimeType=require('./getMimeType');

const staticBasePath=path.join(__dirname,'..');

//respond function
const respond=(request,response)=>{
   //to test
    // response.write('hello');
  

    //getting pathname
    let pathname=url.parse(request.url,true).pathname;
    // console.log(pathname);
    if(pathname==='/favicon.io')
        return false;
    
    //decoding pathname
    pathname=decodeURIComponent(pathname);  
    // console.log(pathname);
    
    //taking to the full static path
    const fullStaticPath=path.join(staticBasePath,pathname);
    // console.log(fullStaticPath);

    //can we find something in the full static path
    //file not present
    if(!fs.existsSync(fullStaticPath))
    {
        response.write('ERROR 404 : File not found');
        response.end();
        return false;
    }
    //getting stats
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync Error: ${err}`);
    }

    //file present
    if(stats.isDirectory())
    {
        //getting template from index.html
        let data=fs.readFileSync(path.join(staticBasePath,'project_files/index.html'),'utf-8');

        //build page title
        let pathElements=pathname.split('/').reverse();
        // console.log(pathElements);
        pathElements = pathElements.filter(element => element !== '');
        let folderName=pathElements[0];
        if(folderName === undefined){
            folderName = 'Home';
        }
        data=data.replace('Home',folderName);

        //editing breadcrumb
        const breadcontent=breadcrumb(pathname);
        data=data.replace('breadcrumbcontent',breadcontent);

        //editing main content
        const maincontentcontent=maincontent(fullStaticPath,pathname);
        data=data.replace('maincontentcontent',maincontentcontent);

 
        response.statusCode = 200;
        //printing data on web page
        response.write(data);
        
        return response.end();
        
    }
    //not a directory and not a file
    if(!stats.isFile())
    {
        response.statusCode = 401;
        response.write('401: Access denied!');
        console.log('not a file!');
        return response.end();
    }

    //getting extension name
    const ext=path.extname(fullStaticPath);
    let head={};
    let options={};
    let statusCode=200;
    let filesize=stats.size;
    

    //getting mime type
    getMimeType(ext)
    .then(mime=>{
        head['Content-Type']=mime;

        if(ext==='.pdf'){
            head['Content-Disposition']='inline';
        }
        if(RegExp('audio').test(mime)||RegExp('video').test(mime)){
            //some header need to be added
            head['Accept-Ranges'] = 'bytes';

            const range = request.headers.range;//this gives starting nd ending byte
            if(range){
                let start_end=range.replace(/bytes=/,'');
                start_end=start_end.split('-');
                let start=parseInt(start_end[0]);
                let end=start_end[1]?parseInt(start_end[1]):filesize-1;
                //setting headers
                head['Content-Range'] = `bytes ${start}-${end}/${filesize}`;
                //Content-Length
                head['Content-Length'] = end - start + 1;
                statusCode = 206;
                
                //options
                options = {start, end};
            }
        }
        // console.log(mime);
        // fs.promises.readFile(fullStaticPath,'utf-8')
        // .then(data=>
        //     {
        //         response.writeHead(statusCode, head);
        //         response.write(data);
        //         return response.end()
        //     })
        // .catch(err=>{
        //     console.log(error);
        //     response.statusCode = 404;
        //     response.write('404: File reading error!');
        //     return response.end();
        // })

        const filestream=fs.createReadStream(fullStaticPath,options);

        response.writeHead(statusCode,head);
        filestream.pipe(response);

        filestream.on('close',()=>
        {
            response.end();
        });
        filestream.on('error',err=>{
            console.log(error.code);
            response.statusCode = 404;
            response.write('404: FileStream error!');
            return response.end();
        });
        
    })
    .catch(err=>{
        response.statusCode = 500;
        response.write('500: Internal server error!');
        console.log(`Promise error: ${err}`);
        return response.end();
    } )

}
module.exports = respond;








