import './DragCard.css';
import {useState} from "react";
export default function DragCard(){
    // 拖放
    const dragStart = (event) => {
        event.dataTransfer.setData("id",event.target.id);
    }
    // 放下的时候，copy一个
    const Dropped = (event) => {
        let data=event.dataTransfer.getData("id");
        let element = document.getElementById(data);
        let elementClone = element.cloneNode(true);
        // event.target.appendChild(elementClone);
        // 找到聊天框
        let talk = document.querySelector('.talk');
        talk.appendChild(elementClone);
        // event.preventDefault(); //跳过默认事件
        // 禁用被copy元素的拖放
        let listOfTarget = document.querySelectorAll("#target .item");
        listOfTarget.forEach(e=>e.setAttribute("draggable","false"))
    }
    // 消息
    function sendMessage(){
        let date = new Date();
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let value = document.querySelector(".message input").value;
        if (value.length===0) return
        let form = 'me';
        // let form = 'manager';
        setMessage({...message, [formatted_date]:{form:form,message:value}});
        document.querySelector(".message input").value = "";
    }
    let [message, setMessage] = useState({
        '2022-3-12 16:30:10': {
            form: 'me',
            message: 'this is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a messagethis is a message'
        },
        '2022-3-12 16:40:10': {
            form: 'manager',
            message: 'this is a manager message'
        }
    });
    let messageResult = [];
    for (let i in message){
        let key = i;
        let form = message[key].form;
        let mess = message[key].message;
        if (form==='me'){
            messageResult.push(<Me time={key} message={mess}/>)
        }else if (form==='manager'){
            messageResult.push(<Manager time={key} message={mess}/>)
        }
    }
    return(
        <div className='DragCard'>
            {/*<div className="area">*/}
            {/*    <div*/}
            {/*        className={'item'}*/}
            {/*        draggable={'true'}*/}
            {/*        // onDrag={(event)=>{*/}
            {/*        //     console.log(event.dataTransfer.getData("Text"));*/}
            {/*        // }}*/}
            {/*        onDragStart={(event)=>dragStart(event)} // 记录下node的id*/}
            {/*        id={'drag1'}*/}
            {/*    >test</div>*/}
            {/*    <div*/}
            {/*        className={'item'}*/}
            {/*        draggable={'true'}*/}
            {/*        // onDrag={(event)=>{*/}
            {/*        //     console.log(event.dataTransfer.getData("Text"));*/}
            {/*        // }}*/}
            {/*        onDragStart={(event)=>dragStart(event)} // 记录下node的id*/}
            {/*        id={'drag1'}*/}
            {/*    >test2</div>*/}
            {/*</div>*/}
            <div className="target"
                 id={'target'}
                 onDrop={(event)=>Dropped(event)} // 添加onDragStart中记录的id结点，添加到本event的target结点
                 onDragOver={(event)=>{event.preventDefault();}} // onDrop的触发需要禁用默认的onDragOver
            >
                <div className="talk">
                    {/*<Me message={"这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文这里是中文"}/>*/}
                    {/*<Manager message={"this is english,this is english,this is english,this is english,this is english,this is english,this is english,this is english,this is english,this is english,this is english,this is english,"}/>*/}
                    {messageResult.map(e=>e)}
                </div>
                {/*底部的input和send*/}
                <div className="bottomTool">
                    <div className="message">
                        <input type="text"/>
                    </div>
                    <div className="send">
                        <button onClick={()=>sendMessage()}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 两个角色的消息框组件
const Me = ({time, message, img="url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTAA/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8wre0/w55qLLqM62ysMrEWAdh+PSl8M6fFLMbu5K7YziNT3b1/CqniRLq98UA2SlhHGobnA55FdbajHmZwxTnLlRtm78NabDGhs/tEwchmVfMGD0znvn0pqahoN3fCH+z0RcHcWiKY4745/KuUVtTtdSFtJCvmxHmN+317Gp5dTthGZXUSXPJJVsh1PUH1rP2rZt7GKOi1LwxHIv2jRg20jPks4b64b+h/OuZZWRyrqVZTggjBBrZ0PWftFwkA8xImTpu7gVJr1kpX7UhzJ0cZ5I9a0umtDJxcWYVFFFBJ1WlKkOmQASYyoYjZnk81aukuLHTP7YFtDeW6zJEFmyu4555H8PQemaz9NmR9PhO45C7T+HFa1rrk9iwSZ3vLJU+WyaVUCsDncMjJI64H41riYRVHmS7E4KbliOWT7nPePtPvbm8j1trWSyF3GpkgkYEbl4BBHTjHBrn49GkfRLnUpn2tBgtFj76k4GD/e749K63xb4gtdTtp4LeRismGVyOmDnpWBq2pXd74ZsdPjG2GCTdHDEnzSN/ebHLH+VeXBuyR7E4wu35EXhKKObVCRnMKMwY+hwAPz5rrJ7bzYXTfu3Ag5yKwfC+nNZvcPPJHvdQDGnJjOehPTPsOlb0zLFA8m/hVJ/SvXo0oundnhV6slU5UcjRRRXPY3Luk3giYwSHCscqfetfULXOlR3TXIhZ2ZYfLILHHDkjsO3PJPSuXqeC5aPzd5ZjIQdxOcEDFa+0fJyEKmvac5myyQWJlRZnkkTHytjoeuPepLaa9vi4ib7LbOMyFG5KjtnrVMabPd30gcrCjMSZGPQf1NbF0i29pHBAUlbABVT8pPqSOwrljDW53c+lrl/RWxvymyDAWPjsPSpdVnVF8iNsk8tz0HpVFLloowEYvJjBkIwB7AdhUGSxJJyT1JrpU2o8py1IwlJS6hRS0VAiKiiikUKKUUUUxC0ooooAKKKKQH/2Q==)"}) => {
  return(
      <div className={'meMessage'}>
          <div className={'meTime'}>{time}</div>
          <div className={'left'}>{message}</div>
          <div className={'right'} style={{backgroundImage: img}}></div>
      </div>
  )
}
const Manager = ({time, message, img="url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTAA/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8tq7pmj3urzbLKEsB95zwq/U1PoGjSa5qiWyErGPmlcfwr/jXZeMryHwp4VjtbECFrg+WgU4IXGWP17Z963lLWy3PNhC6uzhdSTTdIkMMty97MvDi3wqKfTcc5/KoLfUdDnkWOYXtpuOPNZlkVfcgAHFW9E8G6v4hAnXyrSBuVabOSPYdas618PNY0u3MiPb30ajJWMFW/AHrRzQ2ub+yfYS/wDDV3aQieBlu7cjcJIuePXH+FY1dR8O9SeYXGjzElYlMsIbqnOGX6c5/On+K9BWDN9artGf3qAf+PVKk1LlkZyp6XRymKKWitDG56h8N9OWPRJLsj57iU8/7K8D9c1lfE/TpZ/E3h9iC8EiumzHG4HP65FdL8PJFk8J2yr1jd1b67if61q+K9NS5023vjw+mzfaF4zkY2kfrn8K52/ebOyCXKjltJ1i5tpEimsY1ULuc7zlRnHpj8Kt6/qTzKI7aTyo9wV5VTecnpgH+dSXM0baJNcSFVC8t71HpNzaT31+IH8xAiNg467emPy5rDQ7LHHaNZ3Ft8ULPLfNPFI0jKu3zF2nkjtniu21W3WS3kjkGVZSpHtWZ4atP7Q8aahqshwLOEQRrju/P8h+ta+rSAKRWjd0jnkrNnkcsZimeNuqMVP4UVJesJL+4dejSsR+dFdi2PPe52Xw31xLO8m025cIk58yIscAMByPxAH5V1mufEDQLC1ltS51GWRChht+Rzxgt0H6144RVK5gmGWhOR6DqKjkTdzSnUsrHTm6c6kNP1jzMQgmNScoT159eOKLzVbG2xf27NBdoyqqR4G72OBg8U2yuLfxLbJFcOI79F2up4Lf7Qpt5olposf2q9n+XPyqzZYn2FYW1sdyloWvDfxAh0AXFrqljJ/pMnnNcxnLc8AFT2GO1aureKbG70559PuVlLfKoHBBPqOorze48/VbxpymxTgD0VR0FXbe3S3j2p1PU+tbezW5yzqW0RJRS0VocwtFFFMkQqpIJUEjpkUFFZtzKC3qRzRRS6mq+EWkNFFBmLRRRQB//9k=)"}) => {
    return(
        <div className={'managerMessage'}>
            <div className={'right'} style={{backgroundImage: img}}></div>
            <div className="left">{message}</div>
            <div className={'managerTime'}>{time}</div>
        </div>
    )
}
