module.exports.logCreate = (userId = null) => {
  return {
    CREATED_DATE: new Date(),
    CREATED_BY: userId,
  }
}
module.exports.logUpdate = (userId = null) => {
  return {
    MODIFIED_DATE: new Date(),
    MODIFIED_BY: userId,
  }
}
