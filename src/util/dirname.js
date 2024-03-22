import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( 'file:///home/panda/Codigo/bejsproject/src/app.js' ) 
// a netbeans no le gusta import.meta.url nu se porque
// ademas apunto a proposito a src ya que este archivo esta en otra carpeta y necesito que devuelva el path de app
const __dirname = dirname(__filename);


export default __dirname