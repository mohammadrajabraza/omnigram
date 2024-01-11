import {useCallback, useState} from 'react'
import { FileWithPath, useDropzone} from 'react-dropzone'

interface ProfilePictureUploaderProps {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const ProfilePictureUploader = ({ fieldChange, mediaUrl} : ProfilePictureUploaderProps) => {
    const [file, setFile] = useState<Array<File>>();
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    
    const onDrop = useCallback(
        (acceptedFiles: Array<FileWithPath>) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        }, [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    });

    return (
        <div {...getRootProps()} className='flex flex-center w-[200px] h-[200px] bg-dark-3 rounded-full cursor-pointer'>
        <input {...getInputProps()} className='cursor-pointer'/>
        {
            fileUrl ? (
                <>
                    <div className='flex flex-1 w-full h-full relative'>
                        <img
                            src={fileUrl}
                            alt='image'
                            className='w-full rounded-full object-cover'
                        />
                        <div className='absolute bottom-1 right-4 bg-dark-3 w-8 h-8 rounded-full flex items-center justify-center'>
                            <img src='/assets/icons/edit.svg' width={18} height={18} className='invert-white'/>
                        </div>
                    </div>
                </>
            ) : (
                <div className='file_uploader-box'>
                    <img 
                        src='/assets/icons/follow.svg'
                        width={50}
                        height={50}
                        alt='file-upload'
                    />
                    <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                    <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
                </div>
            )
        }
        </div>
    )
}

export default ProfilePictureUploader
