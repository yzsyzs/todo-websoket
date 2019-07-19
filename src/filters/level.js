export const level = (type) => {
  if (!type) {
    return
  }
  let level = {
    '00': '草量级',
    '01': '蝇量级',
    '02': '雏量级',
    '03': '羽量级',
    '04': '轻量级',
    '05': '次中量级'
  }
  return level[type]
}
