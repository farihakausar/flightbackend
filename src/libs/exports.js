const PAGE_SIZE = 20
const jwtTokenSecret = "p%0ri92v!0^ant#Y"
// process.env
const secKey = "p801ri35792d4v6c01t5bi9o2n53210t6a78c998c7e6d5f49e0d5f9b12f3e4f"
// process.env.SEC_KEY

function getOTP() {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateUniqueID(role, entryYear, count) {
  const yearLastTwoDigits = entryYear.toString().slice(-2)
  const memberID = `${role}${yearLastTwoDigits}${count
    .toString()
    .padStart(3, "0")}`
  return memberID
}

const getApprovedIDs = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return []
  }
  const filteredArray = array1.filter((_id) => {
    const item = array2.find(
      (item) => item?._id?.toString() === _id?.toString()
    )
    return item && item.status === "Approved"
  })
  return filteredArray
}

module.exports = {
  jwtTokenSecret,
  PAGE_SIZE,
  secKey,
  getOTP,
  generateUniqueID,
  getApprovedIDs,
}
