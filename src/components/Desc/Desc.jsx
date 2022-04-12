function Desc({style,data}) {
    return(
        <desc style={style} dangerouslySetInnerHTML={{__html: data}}/>
    )
}
export default Desc;
