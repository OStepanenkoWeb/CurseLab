'use client'

import toast from 'react-hot-toast'

import { ourFileRouter } from '@/app/api/uploadthing/core'
import { UploadDropzone } from '@/lib/uploadthing'

interface IFileUploadProps {
	onChange: (url?: string) => void
	endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({ onChange, endpoint }: IFileUploadProps) => {
	const onClientUploadComplete = (res: { url: string | undefined }[]) => {
		console.log('tyuiyiyu', res)
		onChange(res?.[0].url)
	}

	return (
		<UploadDropzone
			content={{label: 'Выберите или перетащите файл', allowedContent: 'изображение 4Mб'}}
			endpoint={endpoint}
			onClientUploadComplete={onClientUploadComplete}
			onUploadError={(error: Error) => {
				toast.error(`${error?.message}`)
			}}
		/>
	)
}

export default FileUpload
