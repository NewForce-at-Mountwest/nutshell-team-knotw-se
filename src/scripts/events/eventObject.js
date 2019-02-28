const buildEventObject = (nameParam, dateParam, locationParam) => {
    return {
        name: nameParam,
        date: dateParam,
        location: locationParam,
        userId: sessionStorage.getItem("userId")
      };
}
export default buildEventObject