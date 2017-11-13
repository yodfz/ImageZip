
export default function (file,opt={quality:0.7}) {
    let cavans = document.createElement('canvas')
    let img = new Image()
    let reader = new FileReader()
    console.log('未压缩大小:',file.size)
    return new Promise((res,rej)=>{
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        img.onload=function(){
            var cvs=document.createElement('canvas');
            cvs.width = img.naturalWidth/2;
            cvs.height = img.naturalHeight/2;
            var ctx=cvs.getContext('2d').drawImage(img,0,0,cvs.width,cvs.height);
            cvs.toBlob(function(blob){
                console.log('压缩之后大小:'+blob.size);
                console.log('压缩比例:'+(blob.size/file.size));
                res(blob);
            },'image/jpeg',quality);
        };
        reader.readAsDataURL(file);
    })
}