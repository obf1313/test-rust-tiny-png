/** 生成 file 文件 */
export const uint8ArrayToFile = (uint8Array: Uint8Array, fileName: string, fileType = 'image/png') => {
  // 将 Uint8Array 转换为 Blob 对象
  const blob = new Blob([uint8Array], { type: fileType })
  // 创建 File 对象
  const file = new File([blob], fileName, { type: fileType })
  return file
}
/** 下载图片 */
export const downloadFile = (uint8Array: Uint8Array, fileName: string) => {
  // 创建 Blob 对象
  const blob = new Blob([uint8Array], { type: 'application/octet-stream' })
  // 创建链接
  const url = URL.createObjectURL(blob)
  // 创建下载链接
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  downloadLink.download = fileName
  // 将下载链接添加到页面中并模拟点击
  document.body.appendChild(downloadLink)
  downloadLink.click()
  // 清理
  URL.revokeObjectURL(url)
  document.body.removeChild(downloadLink)
}
