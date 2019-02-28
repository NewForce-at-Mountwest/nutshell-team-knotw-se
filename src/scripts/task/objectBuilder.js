// const taskObj = (taskParam, dateParam) => {
//     return {
//         task: taskParam,
//         date: dateParam,
//         userId: sessionStorage.getItem("userId")
//     }
// }

// export default taskObj
const taskObj = (taskParam, dateParam, isItComplete) => {
    return {
        task: taskParam,
        date: dateParam,
        completed: isItComplete,
        userId: sessionStorage.getItem("userId")
    }
}

export default taskObj