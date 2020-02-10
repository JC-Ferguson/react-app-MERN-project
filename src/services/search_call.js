import customAxios from "./../api/customAxios";

export const searchCall = (solution) => {
    const querySolution = { querySolution: solution}
    customAxios.post("/category", {
        querySolution,
    })
    .then(response => {
        console.log(response.data)
        // this.props.setSearchResult(response.data);
        // this.props.history.push("/category");
    })
}