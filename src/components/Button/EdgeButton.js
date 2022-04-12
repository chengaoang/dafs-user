import './EdgeButton.css';
import {useState} from "react";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Nice code
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


async function topFunction() {
    let top = document.documentElement.scrollTop;
    for(let i=top;i>0;){
        if(i>100){
            i-=10;
            await sleep(0.5);
            document.body.scrollTop = i; // For Safari
            document.documentElement.scrollTop = i; // For Chrome, Firefox, IE and Opera 
        }else{
            i-=1;
            await sleep(1);
            document.body.scrollTop = i; // For Safari
            document.documentElement.scrollTop = i; // For Chrome, Firefox, IE and Opera 
        }
    }
}




export default function EdgeButton(){
    let [ifVisible, setIfVisible] = useState(false);
    let [leftVisible, setLeftVisible] = useState(false);
    return(
        <div className={'edge'}>
            <iframe
                style={{
                    display: ifVisible ? 'block' : 'none'
                }}
                onMouseEnter={() => setIfVisible(true)}
                onMouseOut={() => setIfVisible(false)}
                frameBorder="no" border="0" marginWidth="0" marginHeight="0" width="300" height="80"
                src="//music.163.com/outchain/player?type=2&id=1842025914&auto=0&height=66"
                title={"163"}
            />
            <div className={'right'}
                 onClick={()=>topFunction()}
                 onMouseEnter={()=>{
                     setIfVisible(true);
                     setLeftVisible(true);
                 }}
                 onMouseOut={()=>{
                     setIfVisible(false);
                     setLeftVisible(false);
                 }}
            >
                <br/>
                登录
            </div>
        </div>
    )
}
