
let style = {
    footer: {
        // paddingTop: "20%",
        // paddingLeft: "10%",
        // paddingRight: "10%"
    }
}
const SFooter = (props) => {
    return(
        <>
            <div style={style.footer}>
                {props.children}
            </div>
        </>
    )
}

export default SFooter;
