'use client'
import { useState } from 'react'
import { Upload, UploadFile } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload'
import init, { tiny_png } from '@/utils/rust-tiny-png'
import { uint8ArrayToFile, downloadFile } from '@/utils/file'

export default function Home() {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const beforeUpload = (file: RcFile) => {
    return new Promise<any>((resolve, reject) => {
      // 创建 FileReader 对象
      const reader = new FileReader()
      // 读取文件流
      reader.onload = event => {
        // 将文件流转换为图片预览
        init()
          .then(() => {
            const arrayBuffer = event.target?.result
            if (arrayBuffer) {
              const buffer = tiny_png(new Uint8Array(arrayBuffer as ArrayBuffer))
              const resizeFile = uint8ArrayToFile(buffer, file.name)
              resolve(resizeFile)
              downloadFile(buffer, file.name)
            }
          })
          .catch(err => {
            console.log(err)
            reject('wasm 初始化失败')
          })
      }
      // 将文件读取为 DataURL
      reader.readAsArrayBuffer(file)
    })
  }
  const handleChange = () => {}
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Upload
        listType="picture-card"
        // TODO: 只有这一步没有测试成功
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </main>
  )
}
