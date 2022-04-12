export default function PhotoFLow(){
    let columnNumber = 6; // 每列显示的行数
    let columns = [];
    for (let i = 0; i < columnNumber; i++) { // 一共columnNumber列
        let items = [];
        for (let i = 0; i < 10; i++) { // 每列10个
            items.push(
                // 随机生成高度200到300的div
                <div key={i} style={{height: Math.random() * 100 + 200, border: 'solid red 1px'}}/>
            )
        }
        // 把“一列div”放入columns数组中
        columns.push(<div key={i} style={style.column}>{items}</div>)
    }
    return(
        <div style={style.frame}>
            {columns}
        </div>
    )
}
// css in js
let style = {
    frame: {
        backgroundColor: "#4d4444",
        display: "grid", /*布局采用grid*/
        gridTemplateColumns: "repeat(6, 1fr)",
        gridGap: "1em", /*间距*/
        gridAutoFlow: "column", /**/
    },
    column: {
        /*奇迹开始*/
        display: "inherit",
        gridGap: "inherit",
        gridAutoRows: "min-content",
        /*奇迹结束*/
    }
}
