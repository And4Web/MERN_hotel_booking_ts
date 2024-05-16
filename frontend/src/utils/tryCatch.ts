const tryCatch = (func: ()=>void) => {
  return async () => {
    await func()
  }
}


export default tryCatch;