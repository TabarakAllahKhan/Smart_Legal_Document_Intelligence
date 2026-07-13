import multer from "multer";
import path from "path";

const storage=multer.memoryStorage();
const fileFilter=(
    req:Express.Request,
    file:Express.Multer.File,
    cb:multer.FileFilterCallback
)=>{
    const allowedExtensions=['.pdf'];
    const ext=path.extname(file.originalname).toLowerCase();

    if(!allowedExtensions.includes(ext)){
        return cb(new Error('Only PDF files are allowed'));
    }else{
        cb(null,true);
    }

}
const upload=multer({
    storage,
    fileFilter,
    limits:{
        fileSize:10*1024*1024 //10MB files allowed
    }

})

export default upload;