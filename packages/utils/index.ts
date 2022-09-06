const GNAME = 'Sp'
export const SpglobName = (name: string) => GNAME + name

// button  sp-button
export const namespace = (n: string) => {
  const name = `${GNAME.toLocaleLowerCase()}-${n}`
  function is(type: string, val: string) {
    if (type) return `${name}--${type}-${val}`
    return null
  }
  return {
    is
  }
}

export * from './install'
