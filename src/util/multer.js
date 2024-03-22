import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb){

        cb(null, './img/product/')
    },
    filename: function(req,file,cb){
        const date = Date.now()
        cb(null, 'p_' + date)
    }
})
const uploader = multer({storage})
export default uploader
