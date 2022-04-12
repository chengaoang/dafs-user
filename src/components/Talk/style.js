let debug = false
let border = "red solid 1px"
export let style = {
    container: {
        height: "93%",
        display: "flex",
        borderRadius: "8rem",
    },
    comment_talk: {
        overflow: "auto",
        opacity: 1,
        flex: 1.5,
        border: debug?border:"",
    },
    desc: {
        marginLeft: "20px",
        flex: 2,
        border: debug?border:"",
    },
    button: {
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}
