import {useState} from 'react';

import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import logoLoader from '../../../assets/images/logo-loader.gif';

export type Props = {
    showLoader:boolean;
    };

const Loader = ({showLoader=false}: Props) => {

    const[show] =useState(showLoader)

     const settings = useInitialSettingStore((s) => s.settings);

    return (
        <MaterialThemeProvider>
            <div id="Loader" className="flex flex-col" style={{width:"100%", opacity:"1", position:"fixed", top:"0px", left:"0px",right:"0px",bottom:"0px", zIndex:"999",backgroundColor: "rgba(78,78,82,0.85)",display:`${!show ? "none" : null}`}}>
                <div style={{marginTop:"35vh", textAlign:"center",display:"flex",alignItems:"center",flexDirection:"column"}}>
                    <div>
                        <img src={logoLoader} alt="logoLoader" className="col-12 p-0 m-0" />
                    </div>
                </div>
            </div>
        </MaterialThemeProvider>
    );
}

export default Loader;
