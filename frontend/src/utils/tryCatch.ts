const tryCatch = (func) => {
  return async () => {
    await func()
  }
}


export default tryCatch;