## File-Explorer
It is a simple file explorer with all the important features like sorting,etc.

#### Features
- This web app can show images and videos in the web itself without any requirement of external app.
- The video player is also optimized to let the user skip the video to any point so as to save the data of the user.
- With some minor modifications,this can let you explore any directory/folder of your system.
- The files/folders can be sorted wrt size,name and last modified date.

#### Build Technologies

- HTML5
- CSS3
- Vanilla js
- ES6
- jQuery
- Nodejs

#### Installation

1. Clone this Repository.
2. Open terminal and go to the project directory and run : </br>
```
node app.js
```
3. If nodejs is not installed ,then first install nodejs using the below given command and then perform step 2 :
```
sudo apt install nodejs
```
4. Open web browser and enter this as url : http://localhost:3500/
5. By default,the project directory will be shown.You can override this behoviour following the below given steps.
Note: Run the project on linux terminal.For windows,WSL(Windows Support for Linux) can be used.

#### Changing the default directory
1. Open lib/respond.js and change below line to the desired directory.
```
const staticBasePath=path.join(__dirname,'..');
```
2. Also change the below line accordingly :
```
let data=fs.readFileSync(path.join(staticBasePath,'project_files/index.html'),'utf-8');
```
3. Move to project_files/index.html and change the below given lines accordingly:
```
<link rel="stylesheet" href="http://localhost:3500/project_files/style.css">
<script src="http://localhost:3500/project_files/script.js"></script>
```
Note : Baically in the above steps, we are just changing the path of the the files so that they work perfectly.  
