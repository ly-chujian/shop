
import Util from "../tools/util.jsx";

let Ctrl = {
    table:{
        checkDataType:data=>{

        },
        getSelectedItems:(data)=>{
            return data.filter(function(item,index,array){
                return item.ck == true;
            })
        }
    }

}

export default Ctrl;