export const revertPath = path => {
  return path.replace('../storage/', '/')
}

export const converPath = path => {
  return `..${path}`
}
